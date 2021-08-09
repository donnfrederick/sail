import EditPageButtons from 'components/organisms/teachers/edit_page_buttons/EditPageButtons'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TeachersActions from 'reducers/teachers'

interface OuterProps {
  type:
    | 'email'
    | 'password'
    | 'name'
    | 'gender'
    | 'picture'
    | 'hobbies'
    | 'purposes'
    | 'desired_condition'
    | 'introduce'
}

interface Props {
  authToken: string
  currentPassword: string
  info: TeachersModels.Info
  type: string
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token,
    currentPassword: state.rootReducer.teachers.current_password,
    info: state.rootReducer.teachers.info,
    type: props.type
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    patchMe: TeachersActions.patchMe
  }
)

export default enhancer(EditPageButtons)
