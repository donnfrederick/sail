import ConfirmBlock from 'components/organisms/students/modal_contents/confirm_block/ConfirmBlock'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as BlocksActions from 'reducers/blocks'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  myId: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    conversation: state.rootReducer.conversation.conversation,
    myId: state.rootReducer.students.me.id
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    postBlocks: BlocksActions.postBlocks,
    setContents: ModalActions.setContents
  }
)

export default enhancer(ConfirmBlock)
