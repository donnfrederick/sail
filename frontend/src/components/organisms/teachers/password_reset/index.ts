import PasswordReset from 'components/organisms/teachers/password_reset/PasswordReset'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
  info: TeachersModels.Info
  sentPasswordResetRequest: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.teachers.error,
    info: state.rootReducer.teachers.info,
    sentPasswordResetRequest:
      state.rootReducer.teachers.sentPasswordResetRequest
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    openModal: ModalActions.open,
    postPassword: TeachersActions.postPassword,
    register: TeachersActions.register,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(PasswordReset)
