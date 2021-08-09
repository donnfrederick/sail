import ApproveStudentRequest from 'components/organisms/teachers/modal_contents/approve_student_request/ApproveStudentRequest'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {
  teachersRequestConversation: ConversationModels.RequestConversationInConversation | null
}

interface Props {
  authToken: string
  teachersRequestConversation: ConversationModels.RequestConversationInConversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token,
    teachersRequestConversation: props.teachersRequestConversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    postApproveRequestConversations:
      ConversationActions.postApproveRequestConversations,
    setContents: ModalActions.setContents
  }
)

export default enhancer(ApproveStudentRequest)
