import { store } from 'components/organisms/Router'
import { lifecycle } from 'recompose'
import {
  changeMonth,
  changeYear,
  getRecommend,
  selectDate
} from 'reducers/conversation'
import { getCurrentMonth, getCurrentYear } from 'utils/calendar'
import getAuthToken from 'utils/getAuthToken'

export default lifecycle({
  async componentDidMount() {
    const authToken = getAuthToken()
    const date = new Date()
    const Y = date.getFullYear()
    const M = ('00' + (date.getMonth() + 1)).slice(-2)
    const D = ('00' + date.getDate()).slice(-2)
    const h = ('00' + date.getHours()).slice(-2)
    const m = ('00' + date.getMinutes()).slice(-2)
    const s = ('00' + date.getSeconds()).slice(-2)
    const now = Y + '-' + M + '-' + D + 'T' + h + ':' + m + ':' + s

    if (authToken) {
      try {
        await store.dispatch<any>(getRecommend(authToken, now))
      } catch {
        // Do nothing
      }
    }
  },
  componentWillMount() {
    store.dispatch(changeYear(getCurrentYear()))
    store.dispatch(changeMonth(getCurrentMonth()))
    store.dispatch(selectDate(''))
  }
})
