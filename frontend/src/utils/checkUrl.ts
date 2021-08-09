import { history } from 'components/organisms/Router'

const teachersSignedOutPages = [
  '/teachers',
  '/teachers/',
  '/teachers/signup',
  '/teachers/signin'
]

const studentsSignedOutPages = [
  '/students',
  '/students/',
  '/students/signup',
  '/students/signin'
]

export const isTeachers = () => {
  return history.location.pathname.includes('teachers')
}

export const isStudents = () => {
  return history.location.pathname.includes('students')
}

export const isTop = () => {
  const pathname = history.location.pathname

  return pathname === '/'
}

export const isSignedOutPage = () => {
  const pathname = history.location.pathname

  return (
    isTop() ||
    teachersSignedOutPages.includes(pathname) ||
    studentsSignedOutPages.includes(pathname)
  )
}

export const shouldMoveToTeachersMyPage = () => {
  const pathname = history.location.pathname

  if (isPasswordResetPage() || isPrivacyPage()) {
    return false
  }

  return teachersSignedOutPages.includes(pathname)
}

export const shouldMoveToStudentsMyPage = () => {
  const pathname = history.location.pathname

  if (isPasswordResetPage() || isPrivacyPage()) {
    return false
  }

  return studentsSignedOutPages.includes(pathname)
}

export const isPasswordResetPage = () => {
  const pathname = history.location.pathname

  return pathname.includes('password_')
}

export const isPrivacyPage = () => {
  const pathname = history.location.pathname

  return pathname.includes('privacy')
}

export const isConversationPage = () => {
  const pathname = history.location.pathname

  return /\/conversations\/\d+$/.test(pathname)
}

export const isConversationEndPage = () => {
  const pathname = history.location.pathname

  return /\/conversations\/\d+\/end$/.test(pathname)
}

export const isUnsupportedPage = () => {
  const pathname = history.location.pathname

  return pathname.includes('unsupported')
}
