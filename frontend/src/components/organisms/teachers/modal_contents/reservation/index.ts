import Reservation from 'components/organisms/teachers/modal_contents/reservation/Reservation'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  response: ConversationModels.Response | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    response: state.rootReducer.conversation.response
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(Reservation)
