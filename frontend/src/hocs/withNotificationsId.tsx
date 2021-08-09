import { store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import { lifecycle } from 'recompose'
import {
  clearCancelledConversationsId,
  clearConversationsId,
  getCancelledConversationsId,
  getConversationsId
} from 'reducers/conversation'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import { getNotificationsId } from 'reducers/notification'
import * as checkUrl from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()

    if (authToken) {
      try {
        const id = store.getState().router.location.pathname.match(/\d+$/)
        if (id.length) {
          await store.dispatch<any>(getNotificationsId(authToken, id[0]))
          getConversation(authToken)
        }
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
  },

  componentWillUnmount() {
    store.dispatch(clearConversationsId())
    store.dispatch(clearCancelledConversationsId())
  }
})

const getConversation = async (authToken: string) => {
  const conversationId = store.getState().rootReducer.notification.notification
    .conversation_id

  if (!conversationId) {
    return
  }

  try {
    await store.dispatch<any>(
      getConversationsId(authToken, String(conversationId))
    )
  } catch (error) {
    await store.dispatch(clearConversationsId())
    await store.dispatch<any>(
      getCancelledConversationsId(authToken, String(conversationId))
    )
  }
}
