import { isPasswordResetPage } from 'utils/checkUrl'
import clearAuthToken from 'utils/clearAuthToken'
import { getStudentsToken, getTeachersToken } from 'utils/getAuthToken'

export default () => {
  if (isPasswordResetPage()) {
    return false
  }

  const hasTeachersToken = getTeachersToken() !== null
  const hasStudentsToken = getStudentsToken() !== null
  const hasBothToken = hasTeachersToken && hasStudentsToken

  if (hasBothToken) {
    clearAuthToken()
    return false
  }

  if (hasTeachersToken) {
    return 'teachers'
  } else if (hasStudentsToken) {
    return 'students'
  } else {
    return false
  }
}
