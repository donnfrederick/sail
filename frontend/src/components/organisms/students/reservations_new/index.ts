import ReservationNew from 'components/organisms/students/reservations_new/ReservatonsNew'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  calendar: ConversationModels.Calendar
  myId: number
  recommendedReservations: ConversationModels.Conversation[]
  selectedDate: string
  selectedMonth: number
  selectedYear: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    calendar: state.rootReducer.conversation.calendar,
    myId: state.rootReducer.students.me.id,
    recommendedReservations:
      state.rootReducer.conversation.recommendedReservations,
    selectedDate: state.rootReducer.conversation.selectedDate,
    selectedMonth: state.rootReducer.conversation.selectedMonth,
    selectedYear: state.rootReducer.conversation.selectedYear
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    changeMonth: ConversationActions.changeMonth,
    changeYear: ConversationActions.changeYear,
    getCalendar: ConversationActions.getCalendar,
    getRecommend: ConversationActions.getRecommend,
    getRecommendNew: ConversationActions.getRecommendNew,
    postConversations: ConversationActions.postConversations,
    resetRecommendedReservations:
      ConversationActions.resetRecommendedReservations,
    selectDate: ConversationActions.selectDate
  }
)

export default enhancer(ReservationNew)
