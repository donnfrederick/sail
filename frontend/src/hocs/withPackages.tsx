import { store } from 'components/organisms/Router'
import { lifecycle } from 'recompose'
import { getPackages, getPk } from 'reducers/students'
import getAuthToken from 'utils/getAuthToken'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()
    if (authToken) {
      store.dispatch<any>(getPk(authToken))
      store.dispatch<any>(getPackages(authToken))
    }
  }
})
