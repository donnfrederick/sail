import { history, store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import IssueModal from 'components/organisms/students/modal_contents/issues'
import TrialRemainingConvosModal from 'components/organisms/students/modal_contents/trial_remaining_convos'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import { lifecycle } from 'recompose'
import {
  getConversations,
  getStudentsRequestConversations
} from 'reducers/conversation'
import { getIssues } from 'reducers/issues'
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
        if (!checkUrl.isTeachers()) {
          // 学生側のみ
          await store.dispatch<any>(getStudentsRequestConversations(authToken))
          if (matches) {
            await store.dispatch<any>(getIssues(authToken))
            const showTutorial = localStorage.getItem('showTutorial')
            const issues = store.getState().rootReducer.issues
            const shouldPurchase =
              issues && issues.issues && issues.issues.length === 0
            const numConvosLeft = shouldPurchase
              ? 0
              : issues.issues[0].conversations

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
            if (
              numConvosLeft > 0 &&
              numConvosLeft <= 3 &&
              showTutorial === 'end'
            ) {
              store.dispatch(
                setModalContents(
                  <TrialRemainingConvosModal
                    lang={issues ? issues.lang : null}
                    token={authToken}
                    page={matches[0]}
                    num_convos={issues ? issues.issues[0].conversations : 0}
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
