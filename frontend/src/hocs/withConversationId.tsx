import { history, store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import { lifecycle } from 'recompose'
import {
  clearConversationsId,
  getConversationsId,
  setChats
} from 'reducers/conversation'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import { isTeachers } from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'
import * as SoraClient from 'utils/SoraClient'
import axios from 'axios'
import resolvePath from 'utils/resolvePath'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()

    if (authToken) {
      try {
        const matches =
          history.location.pathname.match(/conversations\/\d+/) ||
          history.location.pathname.match(/reservations\/detail\/\d+/) ||
          history.location.pathname.match(/history\/\d+/) ||
          history.location.pathname.match(/requests\/detail\/\d+/)
        if (matches) {
          const id = matches[0].split('/').pop()
          await store.dispatch<any>(getConversationsId(authToken, String(id)))
          const config = {
            headers: {
              Authorization: `Bearer ${authToken}`
            },
            params: { id }
          }
          try {
            axios.get(resolvePath.api('chats'), config).then(response => {
              store.dispatch(setChats(response.data))
            })
          } catch {
            // Do nothing
          }
        }
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
    SoraClient.disconnect()
    const matches = history.location.pathname.match(/requests\/detail\/\d+/)
    if (!matches) {
      store.dispatch(clearConversationsId())
    }
  }
})
