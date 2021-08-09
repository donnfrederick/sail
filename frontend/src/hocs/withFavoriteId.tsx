import { history, store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import { UserProfile } from 'models/userProfile'
import * as React from 'react'
import { lifecycle } from 'recompose'
import { clearFavoritesId, getFavoritesId } from 'reducers/favorites'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import * as checkUrl from 'utils/checkUrl'

export default lifecycle({
  async componentDidMount() {
    try {
      const matches = history.location.pathname.match(/favorites\/\d+/)
      if (matches) {
        const id = Number(matches[0].split('/').pop())
        const partner = store
          .getState()
          .rootReducer.favorites.favorites.find(
            (favorite: UserProfile) => favorite.id === id
          )
        if (partner) {
          store.dispatch(getFavoritesId(partner))
        } else {
          // エラーにならないように一覧に移動させる
          const userType = checkUrl.isTeachers() ? 'teachers' : 'students'
          window.location.href = `/${userType}/favorites`
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
    store.dispatch(clearFavoritesId())
  }
})
