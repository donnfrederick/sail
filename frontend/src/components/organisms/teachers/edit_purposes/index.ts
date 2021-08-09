import EditPurposes from 'components/organisms/teachers/edit_purposes/EditPurposes'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  info: TeachersModels.Info
  purposes: SessionsModels.Purpose[]
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    info: state.rootReducer.teachers.info,
    purposes: state.rootReducer.teachers.purposes
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    register: TeachersActions.register
  }
)

export default enhancer(EditPurposes)
