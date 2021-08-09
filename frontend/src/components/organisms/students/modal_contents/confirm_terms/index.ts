import ConfirmTerms from 'components/organisms/students/modal_contents/confirm_terms/ConfirmTerms'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface Props {}

const mapStateToProps = (state: RootState): Props => {
  return {
    info: state.rootReducer.students.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    postMe: StudentsActions.postMe,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(ConfirmTerms)
