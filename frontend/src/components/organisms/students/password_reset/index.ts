import PasswordReset from 'components/organisms/students/password_reset/PasswordReset'
import * as StudentsModels from 'models/students'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  error: any
  info: StudentsModels.Info
  sentPasswordResetRequest: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.students.error,
    info: state.rootReducer.students.info,
    sentPasswordResetRequest:
      state.rootReducer.students.sentPasswordResetRequest
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    openModal: ModalActions.open,
    postPassword: StudentsActions.postPassword,
    register: StudentsActions.register,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(PasswordReset)
