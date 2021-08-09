import StudentDetail from 'components/organisms/teachers/student_detail/StudentDetail'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

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
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(StudentDetail)
