import Signup from 'components/organisms/students/signup/Signup'
import * as LocationsModels from 'models/locations'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  countries: LocationsModels.Countries
  error: any
  hobbies: SessionsModels.Hobbie[]
  info: StudentsModels.Info
  purposes: SessionsModels.Purpose[]
  categories: SessionsModels.Category[]
  tags: SessionsModels.Tag[]
  added_tags: SessionsModels.AddedTag[]
  step: number
  timezones: LocationsModels.Timezones
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    countries: state.rootReducer.locations.countries,
    error: state.rootReducer.students.error,
    hobbies: state.rootReducer.students.hobbies,
    info: state.rootReducer.students.info,
    purposes: state.rootReducer.students.purposes,
    categories: state.rootReducer.students.categories,
    tags: state.rootReducer.students.tags,
    added_tags: state.rootReducer.students.added_tags,
    step: state.rootReducer.students.step,
    timezones: state.rootReducer.locations.timezones
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    back: StudentsActions.back,
    forward: StudentsActions.forward,
    openModal: ModalActions.open,
    postAddedTag: StudentsActions.postAddedTag,
    postSelectedTag: StudentsActions.postSelectedTag,
    postMe: StudentsActions.postMe,
    postPhoneAuthentication: StudentsActions.postPhoneAuthentication,
    postPhoneCodeValidation: StudentsActions.postPhoneCodeValidation,
    postValidate: StudentsActions.postValidate,
    register: StudentsActions.register,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(Signup)
