import { store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import { lifecycle } from 'recompose'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import {
  getHobbies,
  getPurposes,
  getCategories,
  getTags,
  deleteAddedTag
} from 'reducers/teachers'
import * as checkUrl from 'utils/checkUrl'

export default lifecycle({
  async componentDidMount() {
    try {
      await store.dispatch<any>(getHobbies())
      await store.dispatch<any>(getPurposes())
      await store.dispatch<any>(getCategories())
      await store.dispatch<any>(getTags())
      await store.dispatch<any>(deleteAddedTag())
    } catch (error) {
      setModalContents(
        checkUrl.isTeachers() ? (
          <TeachersFailFetchingModal error={error} />
        ) : (
          <StudentsFailFetchingModal error={error} />
        )
      )
      store.dispatch(openModal())
    }
  }
})
