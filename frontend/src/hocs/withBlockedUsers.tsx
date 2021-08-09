import { store } from 'components/organisms/Router'
import StudentsFailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import TeachersFailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as BlocksModels from 'models/blocks'
import * as React from 'react'
import { lifecycle } from 'recompose'
import { clear, getBlocks } from 'reducers/blocks'
import {
  open as openModal,
  setContents as setModalContents
} from 'reducers/modal'
import * as checkUrl from 'utils/checkUrl'
import getAuthToken from 'utils/getAuthToken'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()

    store.dispatch(clear())

    if (authToken) {
      try {
        const parameters: BlocksModels.GetBlocksRequest = {
          page: store.getState().rootReducer.notification.page,
          per_page: 10
        }

        await store.dispatch<any>(getBlocks(authToken, parameters))
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
