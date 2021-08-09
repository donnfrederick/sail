import ConfirmEvaluation from 'components/organisms/teachers/modal_contents/confirm_evaluation/ConfirmEvaluation'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

interface OuterProps {
  score: number
  postEvaluation(): void
}

interface Props {
  conversation: ConversationModels.Conversation | null
  myId: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    conversation: state.rootReducer.conversation.conversation,
    myId: state.rootReducer.teachers.me.id
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    setContents: ModalActions.setContents
  }
)

export default enhancer(ConfirmEvaluation)
