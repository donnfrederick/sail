import { localStorage as localStorageConstants } from 'constants/index'

export default () => {
  localStorage.removeItem(localStorageConstants.ORGANIZATIONS_AUTH_TOKEN_KEY)
  localStorage.removeItem(localStorageConstants.TEACHERS_AUTH_TOKEN_KEY)
  localStorage.removeItem(localStorageConstants.STUDENTS_AUTH_TOKEN_KEY)
  localStorage.removeItem(localStorageConstants.WEB_SOCKET_TOKEN_KEY)

  localStorage.removeItem(localStorageConstants.USERS_EMAIL)
  localStorage.removeItem(localStorageConstants.PACKAGE_ID)
  localStorage.removeItem(localStorageConstants.PACKAGE_PRICE)
  localStorage.removeItem(localStorageConstants.STRIPE_PUBLIC_KEY)
}
