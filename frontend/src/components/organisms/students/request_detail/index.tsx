import RequestDetail from 'components/organisms/students/request_detail/RequestDetail'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// 仮
import * as ConversationModels from 'models/conversation'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  myId: number
  studentsRequestConversation: ConversationModels.RequestConversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    myId: state.rootReducer.students.me.id,
    studentsRequestConversation:
      state.rootReducer.conversation.studentsRequestConversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(RequestDetail)
