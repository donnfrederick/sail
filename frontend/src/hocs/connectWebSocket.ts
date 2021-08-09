import { localStorage as localStorageConstants } from 'constants/index'
import { lifecycle } from 'recompose'
import * as WebSocketClient from 'utils/WebSocketClient'

export default lifecycle({
  componentDidMount() {
    const webSocketToken = localStorage.getItem(
      localStorageConstants.WEB_SOCKET_TOKEN_KEY
    )
    if (webSocketToken) {
      WebSocketClient.connect(webSocketToken)
    }
  }
})
