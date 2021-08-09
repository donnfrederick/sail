import * as Sentry from '@sentry/browser'
import ErrorPage from 'components/pages/Error'
import { createBrowserHistory } from 'history'
import * as React from 'react'
import { Provider, Store } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { compose, lifecycle, withState } from 'recompose'
import createStore from 'store/createStore'
import resetViewport from 'utils/resetViewport'
import userAgent from 'utils/userAgent'

declare const gtag: any

export const history = createBrowserHistory()
export const store = createStore(history) as Store<any>

history.listen(() => {
  window.scrollTo(0, 0)
  gtag('config', 'UA-105776977-2', { page_path: history.location.pathname })
  userAgent()
  resetViewport()
})

interface Props {
  children: JSX.Element
  errors: Error | null
  setErrors: (state: any) => any
}

const isProd = process.env.NODE_ENV === 'production'

const sentry = compose(
  withState('errors', 'setErrors', null),
  isProd
    ? lifecycle<Props, {}, {}>({
        componentDidCatch(error, errorInfo) {
          this.props.setErrors(error)
          Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
              scope.setExtra(key, errorInfo[key])
            })
            Sentry.captureException(error)
          })
        }
      })
    : lifecycle<Props, {}, {}>({
        componentDidCatch(error) {
          this.props.setErrors(error)
        }
      })
)

export default sentry((props: Props) => {
  const { children, errors } = props

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {errors ? <ErrorPage /> : children}
      </ConnectedRouter>
    </Provider>
  )
})
