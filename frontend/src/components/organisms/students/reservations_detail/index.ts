import ReservationsDetail from 'components/organisms/students/reservations_detail/ReservationsDetail'
import * as ConversationModels from 'models/conversation'
import * as UserProfileModels from 'models/userProfile'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'

type Page = 'new' | 'reserved'

interface OuterProps {
  page: Page
}

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  myId: number
  page: Page
  partner: UserProfileModels.UserProfile | null
  recommendedReservation: ConversationModels.Conversation | null
  reservedConversation: ConversationModels.Conversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    conversation: state.rootReducer.conversation.conversation,
    myId: state.rootReducer.students.me.id,
    page: props.page,
    partner: state.rootReducer.teachers.otherUser,
    recommendedReservation:
      state.rootReducer.conversation.recommendedReservation,
    reservedConversation: state.rootReducer.conversation.reservedConversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    openModal: ModalActions.open,
    postRequestConversations: ConversationActions.postRequestConversations,
    postReserve: ConversationActions.postReserve,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(ReservationsDetail)
