import Signout from 'components/organisms/students/modal_contents/signout/Signout'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    deleteSignout: StudentsActions.deleteSignout
  }
)

export default enhancer(Signout)
