import CancelConversation from 'components/organisms/students/modal_contents/cancel_conversation/CancelConversation'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    conversation: state.rootReducer.conversation.conversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    deleteConversations: ConversationActions.deleteConversations,
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(CancelConversation)
