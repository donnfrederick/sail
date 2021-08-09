import FailSignup from 'components/organisms/students/modal_contents/fail_signup/FailSignup'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.students.error
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(FailSignup)
