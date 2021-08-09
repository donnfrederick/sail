import { isStudents, isTeachers } from 'utils/checkUrl'

export const checkUserAgent = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipod|ipad|android/.test(userAgent) ? 'sp' : 'pc'
}

export const isSp = () => checkUserAgent() === 'sp'

export const isPc = () => checkUserAgent() === 'pc'

export const setClass = () => {
  if (isPc()) {
    document.body.classList.add('is-pc')
  } else {
    document.body.classList.remove('is-pc')
  }

  if (isTeachers()) {
    document.body.classList.add('is-teachers')
  } else {
    document.body.classList.remove('is-teachers')
  }

  if (isStudents()) {
    document.body.classList.add('is-students')
  } else {
    document.body.classList.remove('is-students')
  }
}

export default () => {
  setClass()

  window.addEventListener('resize', () => setClass())
}
