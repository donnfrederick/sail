import EditName from 'components/organisms/teachers/edit_name/EditName'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
  info: TeachersModels.Info
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.teachers.error,
    info: state.rootReducer.teachers.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    register: TeachersActions.register
  }
)

export default enhancer(EditName)
