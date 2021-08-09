import Signin from 'components/organisms/students/signin/Signin'
import * as StudentsModels from 'models/students'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
  info: StudentsModels.Info
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.students.error,
    info: state.rootReducer.students.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    postSignin: StudentsActions.postSignin,
    register: StudentsActions.register
  }
)

export default enhancer(Signin)
