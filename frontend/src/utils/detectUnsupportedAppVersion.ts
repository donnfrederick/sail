import { isUnsupportedPage } from 'utils/checkUrl'
import { isAndroid, isIos, isWebview, versionEnough } from 'utils/isWebView'

export default () => {
  if (!isWebview() || isUnsupportedPage()) {
    return false
  }

  if (isIos() && !versionEnough('webview', 1001000)) {
    return true
  }

  if (isAndroid() && !versionEnough('webview', 1002000)) {
    return true
  }

  return false
}
