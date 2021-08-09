import Payment from 'components/organisms/students/payment/Payment'
import * as StudentsModels from 'models/students'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  error: any
  info: StudentsModels.Info
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    error: state.rootReducer.students.error,
    info: state.rootReducer.students.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    getPk: StudentsActions.getPk,
    // postIssue: StudentsActions.postIssue,
    register: StudentsActions.register
  }
)

export default enhancer(Payment)
