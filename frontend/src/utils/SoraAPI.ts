import axios from 'axios'
import { store } from 'components/organisms/Router'
import * as EnvironmentsActions from 'reducers/environments'

let currentChannelId: string
let currentClientId: string

export const setInfo = (channelId?: string, clientId?: string) => {
  currentChannelId = channelId ? channelId : currentChannelId
  currentClientId = clientId ? clientId : currentClientId
}

export const getStats = () => {
  const data = {
    channel_id: currentChannelId,
    client_id: currentClientId
  }
  const target = {
    operation: 'GetStats',
    version: '20170529'
  }

  return api(data, target)
}

export const startRecording = () => {
  const data = {
    channel_id: currentChannelId,
    expire_time: 25 * 60
  }
  const target = {
    operation: 'StartRecording',
    version: '20161101'
  }

  return api(data, target)
}

export const disconnectChannelWithReason = () => {
  const data = {
    channel_id: currentChannelId,
    reason: {
      source: 'sail-js'
    }
  }
  const target = {
    operation: 'DisconnectChannel',
    version: '20151104'
  }

  return api(data, target)
}

export const api = async (
  data: any,
  target: { version: string; operation: string }
) => {
  const config: RequestInit = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-sora-target': `Sora_${target.version}.${target.operation}`
    },
    method: 'POST',
    mode: 'cors'
  }

  if (
    store.getState().rootReducer.environments.environments.sora_api_url === ''
  ) {
    await store.dispatch<any>(EnvironmentsActions.getEnvironments())
  }

  const apiUrl = store.getState().rootReducer.environments.environments
    .sora_api_url

  return axios.post(apiUrl, JSON.stringify(data), config)
}
