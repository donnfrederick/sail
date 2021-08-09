import NotificationsDetail from 'components/organisms/teachers/notifications_detail/NotificationsDetail'
import * as ConversationModels from 'models/conversation'
import * as NotificationModels from 'models/notification'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  cancelledConversation: ConversationModels.CancelledConversation | null
  conversation: ConversationModels.Conversation | null
  myId: number
  notification: NotificationModels.Notification
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    cancelledConversation: state.rootReducer.conversation.cancelledConversation,
    conversation: state.rootReducer.conversation.conversation,
    myId: state.rootReducer.teachers.me.id,
    notification: state.rootReducer.notification.notification
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(NotificationsDetail)
