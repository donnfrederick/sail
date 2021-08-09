import PasswordRenew from 'components/organisms/students/password_renew/PasswordRenew'
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
  isPasswordRenewed: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: state.rootReducer.students.error,
    info: state.rootReducer.students.info,
    isPasswordRenewed: state.rootReducer.students.isPasswordRenewed
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    openModal: ModalActions.open,
    patchPassword: StudentsActions.patchPassword,
    register: StudentsActions.register,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(PasswordRenew)
