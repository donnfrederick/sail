import { store } from 'components/organisms/Router'
import StudentsErrorUserMediaModal from 'components/organisms/students/modal_contents/error_usermedia'
import StudentsReadyModal from 'components/organisms/students/modal_contents/ready'
import TeachersErrorUserMediaModal from 'components/organisms/teachers/modal_contents/error_usermedia'
import TeachersReadyModal from 'components/organisms/teachers/modal_contents/ready'
import * as SoraModels from 'models/sora'
import moment from 'moment'
import * as React from 'react'
import * as ClientLogsActions from 'reducers/client_logs'
import * as ConversationActions from 'reducers/conversation'
import * as EnvironmentsActions from 'reducers/environments'
import * as ModalActions from 'reducers/modal'
import { isTeachers } from 'utils/checkUrl'
import { isNotIos } from 'utils/detectOS'
import getAuthToken from 'utils/getAuthToken'
import * as SoraAPI from 'utils/SoraAPI'
import wait from 'utils/wait'
import * as WebSocketClient from 'utils/WebSocketClient'

declare const Sora: {
  connection: (url: string, debug?: boolean) => SoraModels.SoraConnection
}

const unacceptableErrors = [
  'FAILURE-JSON-DECODE',
  'PONG-TIMEOUT-ERROR',
  'CONNECTION-CREATED-WAIT-TIMEOUT-ERROR',
  'ANSWER-TIMEOUT-ERROR',
  'DUPLICATED-CHANNEL-ID',
  'AUTHENTICATION-FAILURE',
  'AUTHENTICATION-INTERNAL-ERROR',
  'UNKNOWN-CODEC-TYPE',
  'MISSING-TYPE',
  'INVALID-JSON',
  'CONNECT-WAIT-TIMEOUT-ERROR',
  'INVALID-VIDEO-FORMAT',
  'INVALID-AUDIO-FORMAT',
  'BAD-FINGERPRINT'
]

const debug: boolean = false

export let isSoundOnly: boolean = false
export let isConnected: boolean = false
let currentChannelId: string
let sora: SoraModels.SoraConnection
let publisher: SoraModels.SoraObject
let UserMediaStream: MediaStream | null
let timestamp: string
let totalReceivedBytes: number

export const init = async (channelId: string, metadata: string = '') => {
  if (!Sora || isConnected || sora) {
    return
  }

  currentChannelId = channelId

  if (
    store.getState().rootReducer.environments.environments
      .sora_signaling_url === ''
  ) {
    await store.dispatch<any>(EnvironmentsActions.getEnvironments())
  }

  const signalingUrl = store.getState().rootReducer.environments.environments
    .sora_signaling_url
  sora = Sora.connection(signalingUrl, debug)
  setPublisher(channelId, metadata)
}

export const connect = async (reconnection: boolean = false) => {
  if (!Sora || (isConnected && !reconnection)) {
    return
  }

  isConnected = true

  if (reconnection) {
    setPublisher(publisher.channelId, publisher.metadata)
  }

  try {
    await publisher.disconnect()
    UserMediaStream = await navigator.mediaDevices.getUserMedia(
      getConstraints()
    )
    const publisherStream = await publisher.connect(UserMediaStream)
    SoraAPI.setInfo(publisher.channelId, publisher.clientId)

    try {
      SoraAPI.startRecording()
    } catch (error) {
      // tslint:disable-next-line
      console.error(error)
    }

    checkNetworkStats()

    const videoElement = document.querySelector(
      '#local-video'
    ) as HTMLVideoElement | null
    if (videoElement) {
      videoElement.muted = true
      videoElement.srcObject = publisherStream
    }
  } catch (error) {
    // tslint:disable-next-line
    console.error(error)

    stopMediaStream()
    isConnected = false
    store.dispatch(ConversationActions.setConnecting())
    if (String(error).includes('Requested device not found')) {
      changeMode(true)
    }
    if (String(error).includes('Permission denied')) {
      store.dispatch(
        ModalActions.setContents(
          isTeachers() ? (
            <TeachersErrorUserMediaModal />
          ) : (
            <StudentsErrorUserMediaModal />
          )
        )
      )
      store.dispatch(ModalActions.open())
    }
  }
}

export const disconnect = async () => {
  await SoraAPI.disconnectChannelWithReason()
  await publisher.disconnect()
  stopMediaStream()
  isConnected = false
  store.dispatch(ConversationActions.setConnecting())
}

export const changeMode = async (soundOnly?: boolean) => {
  isSoundOnly = soundOnly ? true : !isSoundOnly
  await disconnect()
  connect(true)

  store.dispatch(
    ConversationActions.changeConversationMode(
      isSoundOnly ? 'soundOnly' : 'video'
    )
  )

  WebSocketClient.sendConversationModeChange(
    isSoundOnly ? 'soundOnly' : 'video'
  )
}

export const stopMediaStream = () => {
  if (UserMediaStream) {
    const track = UserMediaStream.getTracks()[0]
    track.stop()
    UserMediaStream = null
  }
}

export const UnmuteRemoteVideo = () => {
  const remoteVideo = document.querySelector(
    '#remote-video'
  ) as HTMLVideoElement | null
  if (remoteVideo) {
    remoteVideo.muted = false
  }
}

export const setPublisher = (channelId: string, metadata: string) => {
  publisher = sora.publisher(channelId, metadata, getOptions())
  setEvents()
}

export const getOptions = (): SoraModels.ConnectionOptions => {
  return isSoundOnly
    ? {
        audio: true,
        audioCodecType: 'OPUS',
        multistream: true,
        video: false
      }
    : {
        audio: true,
        audioCodecType: 'OPUS',
        multistream: true,
        video: true,
        videoCodecType: 'VP9'
      }
}

export const getConstraints = (): MediaStreamConstraints => {
  return isSoundOnly
    ? {
        audio: true,
        video: false
      }
    : {
        audio: true,
        video: {
          facingMode: 'user'
        }
      }
}

export const setEvents = () => {
  publisher.on('disconnect', (event: any) => {
    // tslint:disable-next-line
    console.log('disconnect event: ', event)

    isConnected = false
    store.dispatch(ConversationActions.setConnecting())

    if (shouldRetry(event)) {
      init(currentChannelId)
      connect()
    }
  })
  publisher.on('push', (event: any) => {
    // tslint:disable-next-line
    console.log('push event: ', event)
  })
  publisher.on('addstream', (event: any) => {
    // tslint:disable-next-line
    console.log('addStream event: ', event)

    attachAdditionalStream(event)
    store.dispatch(ConversationActions.clearConnecting())
  })
  publisher.on('removestream', (event: any) => {
    // tslint:disable-next-line
    console.log('remove stream event: ', event)
    store.dispatch(ConversationActions.setConnecting())
  })
  publisher.on('notify', (event: any) => {
    // tslint:disable-next-line
    console.log('notify event: ', event)
  })
  publisher.on('log', (event: any) => {
    // tslint:disable-next-line
    console.log('log event: ', event)
  })
}

export const attachAdditionalStream = (event: any) => {
  const remoteVideo = document.querySelector(
    '#remote-video'
  ) as HTMLVideoElement | null
  if (remoteVideo) {
    if (isNotIos()) {
      remoteVideo.muted = false
      remoteVideo.srcObject = event.stream
    } else {
      remoteVideo.muted = true
      remoteVideo.srcObject = event.stream
      store.dispatch(
        ModalActions.setContents(
          isTeachers() ? <TeachersReadyModal /> : <StudentsReadyModal />
        )
      )
      store.dispatch(ModalActions.open())
    }
  }
}

export const checkNetworkStats = async () => {
  try {
    checkStream()

    const stats = await SoraAPI.getStats()

    const previousTimeStamp = moment(timestamp)
    const currentTimeStamp = moment(stats.data.timestamp)
    const duration = currentTimeStamp.diff(previousTimeStamp, 'seconds')

    const receivedBytesDifference =
      stats.data.rtp.total_received_bytes - totalReceivedBytes

    const kbps = Math.floor((receivedBytesDifference / duration / 1000) * 8)

    if (!isNaN(kbps)) {
      store.dispatch(ConversationActions.setBandwidth(kbps))
    }

    timestamp = stats.data.timestamp
    totalReceivedBytes = stats.data.rtp.total_received_bytes

    wait(10000).then(() => checkNetworkStats())
  } catch (error) {
    return
  }
}

export const checkStream = async () => {
  const remoteVideo = document.querySelector(
    '#remote-video'
  ) as HTMLVideoElement | null
  const canvasElement = document.querySelector(
    '#check-stream'
  ) as HTMLCanvasElement | null
  if (!remoteVideo || !canvasElement) {
    return
  }

  const context = canvasElement.getContext('2d')
  if (!context) {
    return
  }

  const width = window.innerWidth
  const height = window.innerHeight

  context.drawImage(remoteVideo, 0, 0, width, height)

  const imageData = context.getImageData(0, 0, width, height)
  const sum = imageData.data.reduce((previous, current) => previous + current)

  if (sum <= 0) {
    init(currentChannelId)
    connect()
  }
}

export const shouldRetry = (event: any) => {
  if (!event.hasOwnProperty('reason')) {
    return false
  }

  const authToken = getAuthToken()
  store.dispatch<any>(
    ClientLogsActions.report('sora.disconnect.event', event, authToken)
  )

  return unacceptableErrors.includes(event.reason) ? false : true
}
