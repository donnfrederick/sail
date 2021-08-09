const userAgent = window.navigator.userAgent
const macos = /Macintosh|MacIntel|MacPPC|Mac68K/i
const windows = /Win32|Win64|Windows|WinCE/i
const ios = /iPhone|iPad|iPod/i
const android = /android/i

export default () => {
  if (isMac()) {
    return 'macOS'
  } else if (isWindows()) {
    return 'Windows'
  } else if (isIos()) {
    return 'iOS'
  } else if (isAndroid()) {
    return 'Android'
  } else {
    return ''
  }
}

export const isMac = () => {
  return macos.test(userAgent)
}

export const isNotMac = () => !isMac()

export const isWindows = () => {
  return windows.test(userAgent)
}

export const isNotWindows = () => !isWindows()

export const isIos = () => {
  return ios.test(userAgent)
}

export const isNotIos = () => !isIos()

export const isAndroid = () => {
  return android.test(userAgent)
}

export const isNotAndroid = () => !isAndroid()
