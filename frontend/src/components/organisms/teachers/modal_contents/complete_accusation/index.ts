import CompleteAccusation from 'components/organisms/teachers/modal_contents/complete_accusation/CompleteAccusation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

// tslint:disable-next-line
interface Props {}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {}
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(CompleteAccusation)
