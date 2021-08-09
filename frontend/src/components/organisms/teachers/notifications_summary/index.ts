import NotificationsSummary from 'components/organisms/teachers/notifications_summary/NotificationsSummary'
import * as NotificationModels from 'models/notification'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as NotificationActions from 'reducers/notification'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  meta: NotificationModels.Meta
  notifications: NotificationModels.Notification[]
  page: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token,
    meta: state.rootReducer.notification.meta,
    notifications: state.rootReducer.notification.notifications,
    page: state.rootReducer.notification.page
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    forward: NotificationActions.forward,
    getNotifications: NotificationActions.getNotifications
  }
)

export default enhancer(NotificationsSummary)
