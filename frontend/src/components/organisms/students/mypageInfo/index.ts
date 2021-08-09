import MypageInfo from 'components/organisms/students/mypageInfo/MypageInfo'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  myId: number
  page: number
  reservations: ConversationModels.ConversationResponse | null
  studentsRequestConversations: ConversationModels.RequestConversationResponse | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    myId: state.rootReducer.students.me.id,
    page: state.rootReducer.conversation.page,
    reservations: state.rootReducer.conversation.reservations,
    studentsRequestConversations:
      state.rootReducer.conversation.studentsRequestConversations
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    back: ConversationActions.back,
    forward: ConversationActions.forward,
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(MypageInfo)
