import ProfileEdit from 'components/organisms/teachers/profile_edit/ProfileEdit'
import * as SessionsModels from 'models/sessions'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  me: SessionsModels.Me
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    me: state.rootReducer.teachers.me
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(ProfileEdit)
