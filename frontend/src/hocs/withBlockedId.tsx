import { history, store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import { UserProfile } from 'models/userProfile'
import * as React from 'react'
import { lifecycle } from 'recompose'
import { clearBlocksId, getBlocksId } from 'reducers/blocks'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import * as checkUrl from 'utils/checkUrl'

export default lifecycle({
  async componentDidMount() {
    try {
      const matches = history.location.pathname.match(/blocked\/\d+/)
      if (matches) {
        const id = Number(matches[0].split('/').pop())
        const partner = store
          .getState()
          .rootReducer.blocks.blocks.find(
            (block: UserProfile) => block.id === id
          )
        if (partner) {
          store.dispatch(getBlocksId(partner))
        } else {
          // エラーにならないように一覧に移動させる
          const userType = checkUrl.isTeachers() ? 'teachers' : 'students'
          window.location.href = `/${userType}/blocked`
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
  },
  componentWillUnmount() {
    store.dispatch(clearBlocksId())
  }
})
