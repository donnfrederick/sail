import TrialRemainingConvos from 'components/organisms/students/modal_contents/trial_remaining_convos/TrialRemainingConvos'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface Props {}

const mapStateToProps = (state: RootState): Props => {
  return {}
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(TrialRemainingConvos)
