import wait from 'utils/wait'

interface Window {
  fcmToken: string
  setFcmToken(token: string): void
}

declare const window: Window

export default () => {
  window.setFcmToken = (token: string) => {
    window.fcmToken = token
  }
}

export const getFcmToken = async (attempt: number = 1) => {
  await wait(100)

  return window.fcmToken
}
