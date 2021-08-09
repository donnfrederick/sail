import accusations, { State as AccusationsState } from 'reducers/accusations'
import blocks, { State as BlocksState } from 'reducers/blocks'
import conversation, { State as ConversationState } from 'reducers/conversation'
import conversation_history, {
  State as ConversationHistoryState
} from 'reducers/conversation_history'
import environments, { State as EnvironmentsState } from 'reducers/environments'
import evaluations, { State as EvaluationsState } from 'reducers/evaluations'
import favorites, { State as FavoritesState } from 'reducers/favorites'
import issues, { State as IssuesState } from 'reducers/issues'
import locations, { State as LocationsState } from 'reducers/locations'
import modal, { State as ModalState } from 'reducers/modal'
import notification, { State as NotificationState } from 'reducers/notification'
import organizations, {
  State as OrganizationsState
} from 'reducers/organizations'
import report_modal, { State as ReportModalState } from 'reducers/report_modal'
import students, { State as StudentsState } from 'reducers/students'
import teachers, { State as TeachersState } from 'reducers/teachers'
import tutorial, { State as TutorialState } from 'reducers/tutorial'
import { combineReducers } from 'redux'

export interface State {
  rootReducer: {
    accusations: AccusationsState
    blocks: BlocksState
    conversation: ConversationState
    conversation_history: ConversationHistoryState
    environments: EnvironmentsState
    evaluations: EvaluationsState
    favorites: FavoritesState
    issues: IssuesState
    locations: LocationsState
    modal: ModalState
    notification: NotificationState
    organizations: OrganizationsState
    report_modal: ReportModalState
    students: StudentsState
    teachers: TeachersState
    tutorial: TutorialState
  }
}

export default combineReducers({
  accusations,
  blocks,
  conversation,
  conversation_history,
  environments,
  evaluations,
  favorites,
  issues,
  locations,
  modal,
  notification,
  organizations,
  report_modal,
  students,
  teachers,
  tutorial
})
