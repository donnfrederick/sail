import OrganizationUsers from 'components/organisms/teachers/organization_users/OrganizationUsers'
import * as OrganizationsModels from 'models/organizations'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as OrganizationsActions from 'reducers/organizations'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  isOpened: boolean
  organizationsMe: OrganizationsModels.Me
  teachersAuthToken: string
  users: OrganizationsModels.User[]
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    isOpened: state.rootReducer.organizations.isOpened,
    organizationsMe: state.rootReducer.organizations.me,
    teachersAuthToken: state.rootReducer.teachers.me.auth_token,
    users: state.rootReducer.organizations.users
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: OrganizationsActions.close,
    getMe: TeachersActions.getMe,
    getUsers: OrganizationsActions.getUsers,
    open: OrganizationsActions.open,
    openModal: ModalActions.open,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(OrganizationUsers)
