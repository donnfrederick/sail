import { store } from 'components/organisms/Router'
import moment from 'moment'
import { lifecycle } from 'recompose'
import { updateRemainingTime } from 'reducers/conversation'
import wait from 'utils/wait'
import * as WebSocketClient from 'utils/WebSocketClient'

export default lifecycle({
  componentDidUpdate() {
    const serverTime = store.getState().rootReducer.conversation.serverTime
    if (serverTime === null) {
      setTimeout(() => {
        if (serverTime === null) {
          WebSocketClient.sendRemainingTime()
        }
      }, 1000)
    } else {
      wait(1000).then(() => update())
    }
  }
})

const getConversationId = () =>
  store.getState().rootReducer.conversation.conversation.id

const update = () => {
  const serverTime = store.getState().rootReducer.conversation.serverTime
  if (serverTime === null) {
    return
  }

  const current = moment.unix(serverTime.current_time_epoch)
  const endAt = moment.unix(serverTime.end_at_epoch)
  const diff = endAt.diff(current, 'seconds')

  if (diff <= 0) {
    store.dispatch(updateRemainingTime('00:00'))
    WebSocketClient.moveToEvaluation(getConversationId())
    return
  }

  WebSocketClient.sendRemainingTime()
}
