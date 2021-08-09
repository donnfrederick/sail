import Profile from 'components/organisms/teachers/profile/Profile'
import * as SessionsModels from 'models/sessions'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  me: SessionsModels.Me
  selected_tags: SessionsModels.SelectedTag[] | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    selected_tags: state.rootReducer.teachers.selected_tags,
    me: state.rootReducer.teachers.me
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    getSelectedTag: TeachersActions.getSelectedTag
  }
)

export default enhancer(Profile)
