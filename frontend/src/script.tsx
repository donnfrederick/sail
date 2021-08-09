import * as Sentry from '@sentry/browser'
import App from 'components/App'
import { Intl } from 'components/organisms/Intl'
import Router from 'components/organisms/Router'
import { localStorage as localStorageConstant } from 'constants/index'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import fcmToken from 'utils/fcmToken'
import refresh from 'utils/refresh'
import resetViewport from 'utils/resetViewport'
import setVh from 'utils/setVh'
import userAgent from 'utils/userAgent'

Sentry.init({
  dsn: 'https://0eacf2eef72a45dc8dee4d6d747da7da@sentry.io/1417182'
})

if (window.location.search.indexOf('billing') >= 0) {
  localStorage.setItem(localStorageConstant.BILLING_FLAG, 'billing')
}

if (window.location.search.indexOf('reset-token') >= 0) {
  localStorage.removeItem(localStorageConstant.TEACHERS_AUTH_TOKEN_KEY)
  localStorage.removeItem(localStorageConstant.STUDENTS_AUTH_TOKEN_KEY)
}

ReactDOM.render(
  <Intl>
    <Router>
      <App />
    </Router>
  </Intl>,
  document.querySelector('#app')
)

setVh()
userAgent()
fcmToken()
refresh()
resetViewport()
// tslint:disable-next-line
injectGlobal`
  @import url(//fonts.googleapis.com/earlyaccess/notosansjapanese.css);
  @import url(/assets/css/react-datetime.css);
  @import url(/assets/css/react-flags-select.css);
  
  @font-face {
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    src: local('Noto Sans CJK JP Regular'),
      url(//fonts.gstatic.com/ea/notosansjp/v5/NotoSansJP-Regular.woff2) format('woff2'),
      url(//fonts.gstatic.com/ea/notosansjp/v5/NotoSansJP-Regular.woff) format('woff'),
      url(//fonts.gstatic.com/ea/notosansjp/v5/NotoSansJP-Regular.otf) format('opentype');
  }
  html, body {
    font-family: "Noto Sans Japanese", "Noto Sans JP", sans-serif;
    background-color: #f6f7fb;
    touch-action: manipulation;
    min-height: calc(var(--vh, 1vh) * 100);
  }
  .is-pc {
    background-color: #cce5ef;
  }
  * {
    overflow-wrap : break-word;
    line-height: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }
  a, a:hover, a:visited, a:active {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }
  button {
    appearance: none;
    border: none;
    outline: none;
    padding: 0;
    background-color: transparant;
    user-select: none;
  }
`
