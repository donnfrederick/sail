import { lifecycle } from 'recompose'
import * as WebSocketClient from 'utils/WebSocketClient'

export default lifecycle({
  componentDidMount() {
    WebSocketClient.sendConversationsOpen()
  }
})
