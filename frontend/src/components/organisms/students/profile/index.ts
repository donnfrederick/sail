import Profile from 'components/organisms/students/profile/Profile'
import * as SessionsModels from 'models/sessions'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as StudentsActions from 'reducers/students'

// tslint:disable-next-line
interface OuterProps {}

// tslint:disable-next-line
interface Props {
  me: SessionsModels.Me
  selected_tags: SessionsModels.SelectedTag[] | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    selected_tags: state.rootReducer.students.selected_tags,
    me: state.rootReducer.students.me
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    getSelectedTag: StudentsActions.getSelectedTag
  }
)

export default enhancer(Profile)
