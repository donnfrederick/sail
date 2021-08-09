import ConversationHistory from 'components/organisms/teachers/conversation_history/ConversationHistory'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

import * as ConversationModels from 'models/conversation'
import * as ConversationHistoryModels from 'models/conversationHistory'
import * as ConversationHistoryActions from 'reducers/conversation_history'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  conversationHistory: ConversationModels.Conversation[]
  meta: ConversationHistoryModels.Meta
  myId: number
  page: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token,
    conversationHistory:
      state.rootReducer.conversation_history.conversationHistory,
    meta: state.rootReducer.conversation_history.meta,
    myId: state.rootReducer.teachers.me.id,
    page: state.rootReducer.conversation_history.page
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    forward: ConversationHistoryActions.forward,
    getConversationHistory: ConversationHistoryActions.getConversationHistory,
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(ConversationHistory)
