type Target = 'webview' | 'ios' | 'android'

const is = (target: Target) => {
  const element = document.querySelector(`[data-${target}]`)
  if (!element) {
    return false
  }

  return element.textContent === 'true'
}

export const versionEnough = (target: Target, requiredVersionInt: number) => {
  const element = document.querySelector(`[data-${target}-version]`)
  if (!element || !element.textContent) {
    return true
  }

  return parseInt(element.textContent, undefined) >= requiredVersionInt
}

export const isWebview = () => is('webview')
export const isIos = () => is('ios')
export const isAndroid = () => is('android')

export default () => isWebview()
