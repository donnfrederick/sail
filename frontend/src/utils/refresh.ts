import { store } from 'components/organisms/Router'
import { push } from 'react-router-redux'
import * as checkUrl from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'
import resolvePath from 'utils/resolvePath'
import * as SoraClient from 'utils/SoraClient'
import * as WebSocketClient from 'utils/WebSocketClient'

export default () => {
  window.addEventListener('online', () => recoverWebSocket())
  document.addEventListener('visibilitychange', () => refreshConnection())
}

const refreshConnection = () => {
  const state = document.visibilityState

  if (checkUrl.isConversationPage()) {
    window.location.reload()
  } else if (state === 'visible') {
    recoverWebSocket()
    recoverSignedIn()
  }
}

const recoverWebSocket = () => {
  WebSocketClient.reconnect()

  if (SoraClient.isConnected) {
    SoraClient.connect(true)
  }
}

const recoverSignedIn = () => {
  const authToken = getAuthToken()

  if (checkUrl.isSignedOutPage() && authToken) {
    if (checkUrl.shouldMoveToTeachersMyPage()) {
      store.dispatch(push(resolvePath.page('teachers', 'mypage')))
    } else if (checkUrl.shouldMoveToStudentsMyPage()) {
      location.href = '/sessions/jump'
    }
  }
}
