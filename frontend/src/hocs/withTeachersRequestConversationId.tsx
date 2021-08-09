import { history, store } from 'components/organisms/Router'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import { lifecycle } from 'recompose'
import {
  clearConversationsId,
  clearTeachersRequestConversationsId,
  getTeachersRequestConversationsId
} from 'reducers/conversation'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import * as checkUrl from 'utils/checkUrl'

export default lifecycle({
  async componentDidMount() {
    try {
      const matches = history.location.pathname.match(
        /requests\/detail\/\d+\/users\/\d+/
      )
      if (matches) {
        const userId = Number(matches[0].split('/').pop())
        const conversationRequest = store
          .getState()
          .rootReducer.conversation.conversation.conversation_requests.find(
            (
              teacherConversationRequest: ConversationModels.RequestConversationInConversation
            ) => teacherConversationRequest.user.id === userId
          )
        if (conversationRequest) {
          store.dispatch(getTeachersRequestConversationsId(conversationRequest))
        } else {
          // エラーにならないように一覧に移動させる
          const userType = checkUrl.isTeachers() ? 'teachers' : 'students'
          window.location.href = `/${userType}/requests`
        }
      }
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
  },
  componentWillUnmount() {
    store.dispatch(clearTeachersRequestConversationsId())
    store.dispatch(clearConversationsId())
  }
})
