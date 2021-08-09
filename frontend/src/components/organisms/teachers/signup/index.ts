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
  categories: SessionsModels.Category[]
  tags: SessionsModels.Tag[]
  added_tags: SessionsModels.AddedTag[]
  info: TeachersModels.Info
  purposes: SessionsModels.Purpose[]
  showConfirmation: boolean
  step: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.teachers.error,
    info: state.rootReducer.teachers.info,
    categories: state.rootReducer.teachers.categories,
    tags: state.rootReducer.teachers.tags,
    added_tags: state.rootReducer.teachers.added_tags,
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
    setModalContents: ModalActions.setContents,
    postAddedTag: TeachersActions.postAddedTag,
    postSelectedTag: TeachersActions.postSelectedTag
  }
)

export default enhancer(Signup)
