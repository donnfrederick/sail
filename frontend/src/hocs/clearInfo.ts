import { store } from 'components/organisms/Router'
import { lifecycle } from 'recompose'
import * as StudentsActions from 'reducers/students'
import * as TeachersActions from 'reducers/teachers'

export default lifecycle({
  componentWillMount() {
    store.dispatch(TeachersActions.resetInfo())
    store.dispatch(TeachersActions.clearError())
    store.dispatch(StudentsActions.resetInfo())
    store.dispatch(StudentsActions.clearError())
  }
})
