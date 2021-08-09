import CompleteReservation from 'components/organisms/students/modal_contents/complete_reservation/CompleteReservation'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  reservedConversation: ConversationModels.Conversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    reservedConversation: state.rootReducer.conversation.reservedConversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(CompleteReservation)
