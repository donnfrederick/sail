import { store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import { lifecycle } from 'recompose'
import { getCalendar } from 'reducers/conversation'
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
        const conversationState = store.getState().rootReducer.conversation
        const year = conversationState.selectedYear
        const month = conversationState.selectedMonth
        await store.dispatch<any>(getCalendar(authToken, year, month))
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
  }
})
