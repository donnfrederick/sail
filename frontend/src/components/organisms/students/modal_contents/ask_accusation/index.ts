import AskAccusation from 'components/organisms/students/modal_contents/ask_accusation/AskAccusation'
import * as AccusationsModels from 'models/accusations'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as AccusationsActions from 'reducers/accusations'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  myId: number
  reasons: AccusationsModels.Reason[]
  selectedReasonId: number | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    conversation: state.rootReducer.conversation.conversation,
    myId: state.rootReducer.students.me.id,
    reasons: state.rootReducer.accusations.reasons,
    selectedReasonId: state.rootReducer.accusations.selectedReasonId
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    postAccusations: AccusationsActions.postAccusations,
    selectReason: AccusationsActions.select,
    setContents: ModalActions.setContents
  }
)

export default enhancer(AskAccusation)
