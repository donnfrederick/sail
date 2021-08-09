import { history, store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import IssueModal from 'components/organisms/students/modal_contents/issues'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import { lifecycle } from 'recompose'
import {
  getConversations,
  getStudentsRequestConversations
} from 'reducers/conversation'
import { getIssues } from 'reducers/issues'
import { deleteAddedTag } from 'reducers/students'
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
        const matches =
          history.location.pathname.match(/mypage/) ||
          history.location.pathname.match(/reservations/)
        const parameters: ConversationModels.ConversationRequest = matches
          ? {
              page: store.getState().rootReducer.conversation.page,
              term: 'week'
            }
          : {}
        await store.dispatch<any>(getConversations(authToken, parameters))
        await store.dispatch<any>(deleteAddedTag())
        if (!checkUrl.isTeachers()) {
          // 学生側のみ
          await store.dispatch<any>(getStudentsRequestConversations(authToken))
          if (matches) {
            await store.dispatch<any>(getIssues(authToken))
            const issues = store.getState().rootReducer.issues
            const shouldPurchase =
              issues && issues.issues && issues.issues.length === 0
            if (shouldPurchase) {
              store.dispatch(
                setModalContents(
                  <IssueModal
                    lang={issues ? issues.lang : null}
                    gracing={issues.gracing}
                    token={authToken}
                    page={matches[0]}
                  />
                )
              )
              store.dispatch(openModal())
            }
          }
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
  }
})
