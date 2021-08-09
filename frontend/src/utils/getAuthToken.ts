import { localStorage as localStorageConstants } from 'constants/index'

export default (isOrganizations?: boolean) => {
  const isTeachers = window.location.pathname.includes('teachers')
  const isStudents = window.location.pathname.includes('students')

  if (isOrganizations) {
    return getOrganizationsToken()
  }

  if (isTeachers) {
    return getTeachersToken()
  }

  if (isStudents) {
    return getStudentsToken()
  }

  return getTeachersToken() || getStudentsToken()
}

export const getOrganizationsToken = () => {
  return localStorage.getItem(
    localStorageConstants.ORGANIZATIONS_AUTH_TOKEN_KEY
  )
}

export const getTeachersToken = () => {
  return localStorage.getItem(localStorageConstants.TEACHERS_AUTH_TOKEN_KEY)
}

export const getStudentsToken = () => {
  return localStorage.getItem(localStorageConstants.STUDENTS_AUTH_TOKEN_KEY)
}
