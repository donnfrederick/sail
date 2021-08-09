import Signout from 'components/organisms/teachers/modal_contents/signout/Signout'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    deleteSignout: TeachersActions.deleteSignout
  }
)

export default enhancer(Signout)
