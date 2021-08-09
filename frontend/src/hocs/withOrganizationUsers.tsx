import { store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import { lifecycle } from 'recompose'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import { close, getUsers } from 'reducers/organizations'
import * as checkUrl from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'

export default lifecycle({
  async componentDidMount() {
    const organizationAuthToken = getAuthToken(true)
    const authToken = getAuthToken()

    if (organizationAuthToken) {
      try {
        await store.dispatch<any>(getUsers(organizationAuthToken))
      } catch (error) {
        store.dispatch(
          setModalContents(
            checkUrl.isTeachers() ? (
              <TeachersFailFetchingModal error={error} />
            ) : (
              <StudentsFailFetchingModal error={error} />
            )
          )
        )
        store.dispatch(openModal())
      }
    }

    if (authToken) {
      store.dispatch(close())
    }
  }
})
