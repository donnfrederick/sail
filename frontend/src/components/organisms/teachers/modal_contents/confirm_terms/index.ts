import ConfirmTerms from 'components/organisms/teachers/modal_contents/confirm_terms/ConfirmTerms'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as TeachersActions from 'reducers/teachers'
import * as TeachersModels from 'models/teachers'

// tslint:disable-next-line
interface Props {
  error: any
  info: TeachersModels.Info
}

const mapStateToProps = (state: RootState): Props => {
  return {
    error: state.rootReducer.teachers.error,
    info: state.rootReducer.teachers.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    postMe: TeachersActions.postMe,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(ConfirmTerms)
