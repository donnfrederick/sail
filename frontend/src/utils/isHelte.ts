import { localStorage as localStorageConstants } from 'constants/index'

export const isStaff = () => {
  const email = localStorage.getItem(localStorageConstants.USERS_EMAIL)
  return email ? email.includes('@helte-corp.com') : false
}

export default () => isStaff()
