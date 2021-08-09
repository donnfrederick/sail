import ReservationNew from 'components/organisms/teachers/reservations_new/ReservatonsNew'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  auth_token: string
  calendar: ConversationModels.Calendar
  endTime: string
  reservationType: ConversationModels.ReservationType
  selectedDate: string
  selectedMonth: number
  selectedYear: number
  startTime: string
  timeSelect: ConversationModels.TimeSelectType
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    auth_token: state.rootReducer.teachers.me.auth_token,
    calendar: state.rootReducer.conversation.calendar,
    endTime: state.rootReducer.conversation.endTime,
    reservationType: state.rootReducer.conversation.reservationType,
    selectedDate: state.rootReducer.conversation.selectedDate,
    selectedMonth: state.rootReducer.conversation.selectedMonth,
    selectedYear: state.rootReducer.conversation.selectedYear,
    startTime: state.rootReducer.conversation.startTime,
    timeSelect: state.rootReducer.conversation.timeSelect
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    changeMonth: ConversationActions.changeMonth,
    changeTimeSelect: ConversationActions.changeTimeSelect,
    changeYear: ConversationActions.changeYear,
    getCalendar: ConversationActions.getCalendar,
    openModal: ModalActions.open,
    postConversations: ConversationActions.postConversations,
    selectDate: ConversationActions.selectDate,
    selectEndTime: ConversationActions.selectEndTime,
    selectStartTime: ConversationActions.selectStartTime,
    setModalContents: ModalActions.setContents,
    setReservationType: ConversationActions.setReservationType
  }
)

export default enhancer(ReservationNew)
