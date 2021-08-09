import Reservations from 'components/organisms/teachers/reservations/Reservations'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  myId: number
  reservations: ConversationModels.ConversationResponse | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    myId: state.rootReducer.teachers.me.id,
    reservations: state.rootReducer.conversation.reservations
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    openModal: ModalActions.open,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(Reservations)
