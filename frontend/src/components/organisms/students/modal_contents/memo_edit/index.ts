import MemoEdit from 'components/organisms/students/modal_contents/memo_edit/MemoEdit'
import { Conversation } from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {
  conversation: Conversation | null
}

interface Props {
  authToken: string
  conversation: Conversation | null
  myId: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    conversation: props.conversation,
    myId: state.rootReducer.students.me.id
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    patchConversationsMemo: ConversationActions.patchConversationsMemo,
    postConversationsMemo: ConversationActions.postConversationsMemo
  }
)

export default enhancer(MemoEdit)
