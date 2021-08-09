import EditInfo from 'components/organisms/students/edit_info/EditInfo'
import * as LocationsModels from 'models/locations'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface OuterProps {}

// tslint:disable-next-line
interface Props {
  authToken: string
  countries: LocationsModels.Countries
  error: any
  info: StudentsModels.Info
  me: SessionsModels.Me
  timezones: LocationsModels.Timezones
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    countries: state.rootReducer.locations.countries,
    error: state.rootReducer.students.error,
    info: state.rootReducer.students.info,
    me: state.rootReducer.students.me,
    timezones: state.rootReducer.locations.timezones
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    openModal: ModalActions.open,
    patchMe: StudentsActions.patchMe,
    register: StudentsActions.register,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(EditInfo)
