import { store } from 'components/organisms/Router'
// import { animateScroll } from 'react-scroll'
import StudentsNotifyAbsence from 'components/organisms/students/modal_contents/notify_absence'
import StudentsStartConversationModal from 'components/organisms/students/modal_contents/start_conversation'
import TeachersNotifyAbsence from 'components/organisms/teachers/modal_contents/notify_absence'
import NotifyMatching from 'components/organisms/teachers/modal_contents/notify_matching'
import TeachersStartConversationModal from 'components/organisms/teachers/modal_contents/start_conversation'
import { localStorage as localStorageConstants } from 'constants/index'
import * as ConversationModels from 'models/conversation'
import * as OrganizationsModels from 'models/organizations'
import moment from 'moment'
import * as React from 'react'
import { push } from 'react-router-redux'
import * as ClientLogsActions from 'reducers/client_logs'
import * as ConversationActions from 'reducers/conversation'
import * as EnvironmentsActions from 'reducers/environments'
import * as ModalActions from 'reducers/modal'
import * as TeachersActions from 'reducers/teachers'
import * as checkUrl from 'utils/checkUrl'
import exponentialBackoff from 'utils/exponentialBackoff'
import getAuthToken from 'utils/getAuthToken'
import resolvePath from 'utils/resolvePath'
import * as SoraClient from 'utils/SoraClient'
import wait from 'utils/wait'
import zeroPadding from './zeroPadding'

export type Channel = 'Appearance' | 'Conversations'

const isTeachers = () => window.location.pathname.includes('teachers')
const isStudents = () => window.location.pathname.includes('students')

const getEndpoint = async () => {
  try {
    await store.dispatch<any>(EnvironmentsActions.getEnvironments())
    return store.getState().rootReducer.environments.environments.app_socket_url
  } catch (error) {
    throw error
  }
}

let socket: WebSocket | undefined

export const connect = async (
  WebSocketToken: string,
  attempt: number = 1,
  delay: number = 5
) => {
  const endpoint = await getEndpoint()
  if (endpoint && socket === undefined) {
    socket = new WebSocket(endpoint + WebSocketToken)

    listenCloseEvent()
    listenErrorEvent()

    socket.addEventListener('error', async () => {
      await wait(exponentialBackoff(attempt, delay))
      connect(
        WebSocketToken,
        attempt + 1
      )
    })

    listenOpenEvent()
    listenMessageEvent()
  }
}

export const reconnect = () => {
  if (socket) {
    socket.close()
    socket = undefined
  }

  const webSocketToken = localStorage.getItem(
    localStorageConstants.WEB_SOCKET_TOKEN_KEY
  )

  if (webSocketToken) {
    connect(webSocketToken)
  }
}

const send = async (data: any, attempt: number = 1, delay: number = 1.5) => {
  if (!socket || socket.readyState !== 1) {
    await wait(exponentialBackoff(attempt, delay))
    send(data, attempt + 1)
    return
  }

  socket.send(JSON.stringify(data))
}

const subscribeChannel = (channel: Channel, subscribe: boolean = true) => {
  const data = {
    command: subscribe ? 'subscribe' : 'unsubscribe',
    identifier: `{"channel":"${channel}Channel"}`
  }
  send(data)
}

const listenErrorEvent = () => {
  if (!socket) {
    return
  }

  socket.addEventListener('error', async error => {
    const authToken = getAuthToken()
    store.dispatch<any>(
      ClientLogsActions.report('websocket.error', error, authToken)
    )
  })
}

const listenCloseEvent = () => {
  if (!socket) {
    return
  }

  socket.addEventListener('close', async error => {
    const authToken = getAuthToken()
    store.dispatch<any>(
      ClientLogsActions.report('websocket.close', error, authToken)
    )
  })
}

const listenOpenEvent = () => {
  if (!socket) {
    return
  }

  socket.addEventListener('open', error => {
    subscribeChannel('Appearance')
    subscribeChannel('Conversations')

    const authToken = getAuthToken()
    store.dispatch<any>(
      ClientLogsActions.report('websocket.open', error, authToken)
    )
  })
}

const listenMessageEvent = () => {
  if (!socket) {
    return
  }

  socket.addEventListener('message', (event: MessageEvent) => {
    if (checkUrl.isSignedOutPage()) {
      return
    }

    const data = JSON.parse(event.data)
    if (!data.message) {
      return
    }

    const message = data.message
    const channel = data.message.channel

    if (channel === 'ConversationsChannel') {
      conversationsChannelAction(message)
    }
  })
}

const conversationsChannelAction = (message: any) => {
  const action = message.action
  if (action === 'open') {
    openModalToStartConversation(message.conversation)
  } else if (action === 'close') {
    moveToEvaluation(message.conversation.id)
  } else if (action === 'close_soon') {
    showFarewellBalloon()
  } else if (action === 'late') {
    showLateBalloon()
  } else if (action === 'change_user') {
    changeUser(message.user.id)
  } else if (action === 'change_mode') {
    changeConversationMode(message.mode)
  } else if (action === 'topic_open') {
    setTopics(message.topics)
    openTopics()
  } else if (action === 'topic_closed') {
    closeTopics()
  } else if (action === 'topic_select') {
    setCurrentTopic(message.topic)
    closeTopics()
  } else if (action === 'notify_absence') {
    openModalToNotifyAbsence(message.user.evaluate, message.user.lateness)
  } else if (action === 'notify_matching') {
    openModalToNotifyMatching(message.conversation)
  } else if (action === 'remaining_time') {
    adjustRemainingTime(message)
  } else if (action === 'update_chats') {
    setChats(message.chats)
  }
}

const adjustRemainingTime = (serverTime: ConversationModels.ServerTime) => {
  store.dispatch(ConversationActions.setServerTime(serverTime))

  const current = moment.unix(serverTime.current_time_epoch)
  const endAt = moment.unix(serverTime.end_at_epoch)
  const diff = endAt.diff(current, 'minutes')

  const remainingTime = endAt.diff(current, 'seconds')
  const isFiveMinutesAgo = diff < -5

  if (isFiveMinutesAgo) {
    const type = isTeachers() ? 'teachers' : isStudents() ? 'students' : null
    if (type) {
      store.dispatch(push(resolvePath.page(type, 'mypage')))
    }
  } else {
    store.dispatch(
      ConversationActions.updateRemainingTime(
        `${zeroPadding(Math.floor(remainingTime / 60))}:${zeroPadding(
          remainingTime % 60
        )}`
      )
    )
  }
}

const openModalToStartConversation = (
  conversation: ConversationModels.Conversation
) => {
  if (checkUrl.isConversationPage() || checkUrl.isConversationEndPage()) {
    return
  }

  store.dispatch(ModalActions.close())
  store.dispatch(ModalActions.setContents(<div />))

  const path = `conversations/${conversation.id}`

  if (isTeachers()) {
    store.dispatch(
      ModalActions.setContents(
        <TeachersStartConversationModal
          conversation={{ ...conversation }}
          path={path}
        />
      )
    )
  } else {
    store.dispatch(
      ModalActions.setContents(
        <StudentsStartConversationModal
          conversation={{ ...conversation }}
          path={path}
        />
      )
    )
  }

  store.dispatch(ModalActions.open())
}

export const moveToEvaluation = (conversationId: number) => {
  const type = isTeachers() ? 'teachers' : isStudents() ? 'students' : null
  if (type) {
    store.dispatch(
      push(resolvePath.page(type, `conversations/${conversationId}/evaluate`))
    )
  }
}

const showFarewellBalloon = () => {
  store.dispatch(ConversationActions.setCloseSoon())
}

const showLateBalloon = () => {
  store.dispatch(ConversationActions.setYouAreLate())

  setTimeout(() => store.dispatch(ConversationActions.clearYouAreLate()), 5000)
}

const changeUser = async (id: number) => {
  const state = store.getState().rootReducer
  const users: OrganizationsModels.User[] = state.organizations.users
  const designatedUser = users.find(user => user.id === id)

  if (designatedUser) {
    await store.dispatch<any>(TeachersActions.getMe(designatedUser.auth_token))
    window.location.reload()
  }
}

const changeConversationMode = (mode: 'video' | 'soundOnly') => {
  if (
    (SoraClient.isSoundOnly === true && mode === 'soundOnly') ||
    (SoraClient.isSoundOnly === false && mode === 'video')
  ) {
    return
  }

  SoraClient.changeMode(mode === 'soundOnly' ? true : false)
}

const openTopics = () => {
  store.dispatch(ConversationActions.openTopics())
}

const closeTopics = () => {
  store.dispatch(ConversationActions.closeTopics())
}

const setTopics = (topics: ConversationModels.Topics) => {
  store.dispatch(ConversationActions.setTopics(topics))
}

const setCurrentTopic = (topic: string) => {
  store.dispatch(ConversationActions.setCurrentTopic(topic))
}

const setChats = (chats: ConversationModels.Chats[]) => {
  store.dispatch(ConversationActions.setChats(chats))
}

const openModalToNotifyAbsence = (evaluate: number, lateness: number) => {
  store.dispatch(
    ModalActions.setContents(
      isTeachers() ? (
        <TeachersNotifyAbsence score={evaluate} />
      ) : (
        <StudentsNotifyAbsence score={evaluate} lateness={lateness} />
      )
    )
  )
  store.dispatch(ModalActions.open())
}

const openModalToNotifyMatching = (
  conversation: ConversationModels.Conversation
) => {
  const path = `reservations/detail/${conversation.id}`
  store.dispatch(
    ModalActions.setContents(
      <NotifyMatching conversation={conversation} path={path} />
    )
  )
  store.dispatch(ModalActions.open())
}

export const sendConversationsOpen = () => {
  const data = {
    command: 'message',
    data: '{"action":"open"}',
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}

export const sendConversationsClose = () => {
  const data = {
    command: 'message',
    data: '{"action":"close"}',
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}

export const sendConversationModeChange = (mode: string) => {
  const data = {
    command: 'message',
    data: `{"action":"change_mode","mode":"${mode}"}`,
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}

export const sendTopicsOpen = () => {
  const data = {
    command: 'message',
    data: '{"action":"topic_open"}',
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}

export const sendTopicsClose = () => {
  const data = {
    command: 'message',
    data: '{"action":"topic_close"}',
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}

export const sendTopicSelection = (topic: string) => {
  const data = {
    command: 'message',
    data: `{"action":"topic_select","topic":"${topic}"}`,
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}

export const sendRemainingTime = () => {
  const data = {
    command: 'message',
    data: `{"action":"remaining_time"}`,
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}

// export const sendChat = (chats: ConversationModels.Conversation['chats']) => {
export const sendChat = (chats: string) => {
  const data = {
    command: 'message',
    data: `{"action":"update_chats","chats":"${chats}"}`,
    identifier: '{"channel":"ConversationsChannel"}'
  }
  send(data)
}
