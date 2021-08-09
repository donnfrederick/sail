import Signup from 'components/organisms/teachers/signup/Signup'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
  hobbies: SessionsModels.Hobbie[]
  info: TeachersModels.Info
  purposes: SessionsModels.Purpose[]
  showConfirmation: boolean
  step: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.teachers.error,
    hobbies: state.rootReducer.teachers.hobbies,
    info: state.rootReducer.teachers.info,
    purposes: state.rootReducer.teachers.purposes,
    showConfirmation: state.rootReducer.teachers.showConfirmation,
    step: state.rootReducer.teachers.step
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    back: TeachersActions.back,
    cancel: TeachersActions.cancel,
    confirm: TeachersActions.confirm,
    forward: TeachersActions.forward,
    openModal: ModalActions.open,
    postMe: TeachersActions.postMe,
    postValidate: TeachersActions.postValidate,
    register: TeachersActions.register,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(Signup)
