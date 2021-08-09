import Evaluation from 'components/organisms/students/evaluation/Evaluation'
import * as ConversationModels from 'models/conversation'
import { EvaluationType } from 'models/evaluations'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as BlocksActions from 'reducers/blocks'
import * as ConversationActions from 'reducers/conversation'
import * as FavoritesActions from 'reducers/favorites'
import * as ModalActions from 'reducers/modal'
import * as ReportModalActions from 'reducers/report_modal'

// tslint:disable-next-line
interface OuterProps {
  type: EvaluationType
}

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  isReportModalOpen: boolean
  myId: number
  type: EvaluationType
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    conversation: state.rootReducer.conversation.conversation,
    isReportModalOpen: state.rootReducer.report_modal.isOpened,
    myId: state.rootReducer.students.me.id,
    type: props.type
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    closeReportModal: ReportModalActions.close,
    openModal: ModalActions.open,
    openReportModal: ReportModalActions.open,
    patchConversationsEvaluate: ConversationActions.patchConversationsEvaluate,
    patchConversationsMemo: ConversationActions.patchConversationsMemo,
    patchConversationsReport: ConversationActions.patchConversationsReport,
    postBlocks: BlocksActions.postBlocks,
    postConversationsEvaluate: ConversationActions.postConversationsEvaluate,
    postConversationsMemo: ConversationActions.postConversationsMemo,
    postConversationsReport: ConversationActions.postConversationsReport,
    postFavorites: FavoritesActions.postFavorites,
    setEvaluation: ConversationActions.setEvaluation,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(Evaluation)
