import EditIntroduce from 'components/organisms/teachers/edit_introduce/EditIntroduce'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
  info: TeachersModels.Info
  me: SessionsModels.Me
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.teachers.error,
    info: state.rootReducer.teachers.info,
    me: state.rootReducer.teachers.me
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    register: TeachersActions.register
  }
)

export default enhancer(EditIntroduce)
