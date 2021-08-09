import { store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as UserProfileModels from 'models/userProfile'
import * as React from 'react'
import { lifecycle } from 'recompose'
import { clearEvaluations, getEvaluations } from 'reducers/evaluations'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import { isTeachers } from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()
    const props = this.props as UserProfileModels.ProfilePageProps
    const { user, isSelf } = props
    const userId = user && user.id
    if (authToken && userId && !isSelf) {
      try {
        await store.dispatch<any>(getEvaluations(authToken, String(userId)))
      } catch (error) {
        store.dispatch(
          setModalContents(
            isTeachers() ? (
              <TeachersFailFetchingModal error={error} />
            ) : (
              <StudentsFailFetchingModal error={error} />
            )
          )
        )
        store.dispatch(openModal())
      }
    }
  },
  componentWillUnmount() {
    store.dispatch(clearEvaluations())
  }
})
