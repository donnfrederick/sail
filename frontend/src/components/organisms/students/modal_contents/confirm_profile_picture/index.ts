import ConfirmProfilePicture from 'components/organisms/students/modal_contents/confirm_profile_picture/ConfirmProfilePicture'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

interface OuterProps {
  onConfirm(): void
}

// tslint:disable-next-line
interface Props {}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    info: state.rootReducer.students.info,
    onConfirm: props.onConfirm
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(ConfirmProfilePicture)
