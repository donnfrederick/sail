import Loading from 'components/organisms/loading/Loading'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  isFetchingConversation: boolean
  isFetchingLocations: boolean
  isFetchingNotification: boolean
  isFetchingOrganizations: boolean
  isFetchingStudentsMe: boolean
  isFetchingTeachersMe: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    isFetchingConversation: state.rootReducer.conversation.fetching > 0,
    isFetchingLocations: state.rootReducer.locations.isFetching,
    isFetchingNotification: state.rootReducer.notification.isFetching,
    isFetchingOrganizations: state.rootReducer.organizations.isFetching,
    isFetchingStudentsMe: state.rootReducer.students.isFetching,
    isFetchingTeachersMe: state.rootReducer.teachers.isFetching
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(Loading)
