import Signin from 'components/organisms/teachers/signin/Signin'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as OrganizationsActions from 'reducers/organizations'
import * as TeachersActions from 'reducers/teachers'

interface OuterProps {
  isOrganizations?: boolean
}

interface Props {
  error: any
  info: TeachersModels.Info
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: props.isOrganizations
      ? state.rootReducer.organizations.error
      : state.rootReducer.teachers.error,
    info: state.rootReducer.teachers.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    postOrganizationsSignin: OrganizationsActions.postSignin,
    postSignin: TeachersActions.postSignin,
    register: TeachersActions.register
  }
)

export default enhancer(Signin)
