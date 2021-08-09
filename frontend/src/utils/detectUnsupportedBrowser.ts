import { isStudents, isUnsupportedPage } from 'utils/checkUrl'
import isChrome from 'utils/isChrome'
import { isAndroid, isIos, isWebview } from 'utils/isWebView'
import { isPc } from 'utils/userAgent'

export default () => {
  if (isWebview()) {
    return
  }
  if (
    window.location.pathname === '/students' ||
    window.location.pathname.indexOf('/students/signin') === 0 ||
    window.location.pathname.indexOf('/students/signup') === 0
  ) {
    return
  }

  if (isPc() && isChrome() && isUnsupportedPage()) {
    window.location.href = '/'
  }

  if (isWebview() === false && isIos()) {
    window.alert('お使いのブラウザは非対応です。App Store に移動します。')
    window.location.href =
      'https://itunes.apple.com/jp/app/sail-japanese-conversations/id1434041945'
  }

  if (isWebview() === false && isAndroid()) {
    window.alert('お使いのブラウザは非対応です。Google Play に移動します。')
    window.location.href =
      'https://play.google.com/store/apps/details?id=jp.helte.android.sail'
  }

  if (isPc() && isChrome() === false && isUnsupportedPage() === false) {
    window.location.href = isStudents()
      ? '/students/unsupported'
      : '/teachers/unsupported'
  }
}
