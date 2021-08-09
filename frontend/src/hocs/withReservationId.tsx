import { history, store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import { lifecycle } from 'recompose'
import { clearConversationsId, getConversationsId } from 'reducers/conversation'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import { getStudent } from 'reducers/students'
import { getTeacher } from 'reducers/teachers'
import { isTeachers } from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'
import getPartner from 'utils/getPartner'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()

    if (authToken) {
      try {
        const regexp = /detail\/\d+/
        const matches = history.location.pathname.match(regexp)
        const myId = isTeachers()
          ? store.getState().rootReducer.teachers.me.id
          : store.getState().rootReducer.students.me.id
        const getPartnerData = isTeachers() ? getStudent : getTeacher

        if (matches) {
          const id = matches[0].split('/').pop()
          await store.dispatch<any>(getConversationsId(authToken, String(id)))
          const partner = getPartner(
            store.getState().rootReducer.conversation.conversation,
            myId
          )
          if (partner) {
            await store.dispatch<any>(
              getPartnerData(authToken, partner.id, myId)
            )
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
    store.dispatch(clearConversationsId())
  }
})
