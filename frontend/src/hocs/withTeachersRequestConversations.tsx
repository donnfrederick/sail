import { store } from 'components/organisms/Router'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import { lifecycle } from 'recompose'
import { getTeachersRequestConversations } from 'reducers/conversation'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import * as checkUrl from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()

    if (authToken) {
      try {
        await store.dispatch<any>(getTeachersRequestConversations(authToken))
      } catch (error) {
        store.dispatch(
          setModalContents(
            checkUrl.isTeachers() ? (
              <TeachersFailFetchingModal error={error} />
            ) : (
              <FailFetchingModal error={error} />
            )
          )
        )
        store.dispatch(openModal())
      }
    }
  }
})
