import { store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import UpdateRequiredModal from 'components/organisms/students/modal_contents/update_requied'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import { localStorage as localStorageConstant } from 'constants/index'
import * as React from 'react'
import { push } from 'react-router-redux'
import { lifecycle } from 'recompose'
import * as ModalActions from 'reducers/modal'
import * as StudentsReducers from 'reducers/students'
import * as TeachersReducers from 'reducers/teachers'
import * as checkUrl from 'utils/checkUrl'
import detectUnsupportedAppVersion from 'utils/detectUnsupportedAppVersion'
import getAuthToken from 'utils/getAuthToken'
import hasSignedInUser from 'utils/hasSignedInUser'
import resolvePath from 'utils/resolvePath'
import * as WebSocketClient from 'utils/WebSocketClient'
import { getSelectedTag } from 'reducers/teachers'

const WEB_SOCKET_TOKEN_KEY = 'web_socket_token'

export default lifecycle({
  componentDidMount() {
    const authToken = getAuthToken()

    if (checkUrl.isUnsupportedPage()) {
      return
    }

    if (detectUnsupportedAppVersion()) {
      store.dispatch(ModalActions.setContents(<UpdateRequiredModal />))
      store.dispatch(ModalActions.open())
    }

    if (authToken) {
      try {
        store.dispatch<any>(getSelectedTag())
        const getMe =
          hasSignedInUser() === 'teachers'
            ? TeachersReducers.getMe
            : StudentsReducers.getMe
        store.dispatch<any>(getMe(authToken))

        if (checkUrl.isTop() && hasSignedInUser() === false) {
          return
        }

        if (
          hasSignedInUser() === 'teachers' &&
          (checkUrl.shouldMoveToTeachersMyPage() || checkUrl.isTop())
        ) {
          store.dispatch(push(resolvePath.page('teachers', 'mypage')))
        } else if (
          hasSignedInUser() === 'students' &&
          (checkUrl.shouldMoveToStudentsMyPage() || checkUrl.isTop())
        ) {
          const BILLING_FLAG = localStorage.getItem(
            localStorageConstant.BILLING_FLAG
          )
          localStorage.removeItem(localStorageConstant.BILLING_FLAG)

          if (BILLING_FLAG === 'billing') {
            location.href =
              '/billing/students/points/overview/' + getAuthToken()
          } else {
            store.dispatch(push(resolvePath.page('students', 'mypage')))
          }
        }
      } catch (error) {
        ModalActions.setContents(
          checkUrl.isTeachers() ? (
            <TeachersFailFetchingModal error={error} />
          ) : (
            <StudentsFailFetchingModal error={error} />
          )
        )
        ModalActions.open()
      }
    } else {
      if (!(checkUrl.isPasswordResetPage() || checkUrl.isPrivacyPage())) {
        if (checkUrl.isTeachers()) {
          store.dispatch(push(resolvePath.page('teachers')))
        } else if (checkUrl.isStudents()) {
          store.dispatch(push(resolvePath.page('students')))
        }
      }
    }

    const webSocketToken = localStorage.getItem(WEB_SOCKET_TOKEN_KEY)
    if (webSocketToken) {
      WebSocketClient.connect(webSocketToken)
    }
  }
})
