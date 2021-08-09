import Loading from 'components/organisms/loading'
import * as React from 'react'
import Loadable from 'react-loadable'

const LoadingComponent = () => <Loading showAnyway={true} />

export default (component: () => Promise<any>) => {
  return Loadable({
    loader: component,
    loading: LoadingComponent
  })
}
