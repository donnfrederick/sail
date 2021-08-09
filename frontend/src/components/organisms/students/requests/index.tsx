import Requests from 'components/organisms/students/requests/Requests'
import { RequestConversationResponse } from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  myId: number
  studentsRequestConversations: RequestConversationResponse | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    myId: state.rootReducer.students.me.id,
    studentsRequestConversations:
      state.rootReducer.conversation.studentsRequestConversations
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(Requests)
