import FailSignup from 'components/organisms/teachers/modal_contents/fail_signup/FailSignup'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.teachers.error
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(FailSignup)
