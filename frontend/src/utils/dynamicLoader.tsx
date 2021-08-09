import Loading from 'components/organisms/loading'
import ModalError from 'components/molecules/modal/Error'
import * as React from 'react'
import Loadable from 'react-loadable'

const LoadingComponent = (props: Loadable.LoadingComponentProps) => {
  if (props.error || props.timedOut) {
    return <ModalError message="Taking a long time..." />
  } else {
    return <Loading showAnyway={true} />
  }
}

export default (component: () => Promise<any>) => {
  return Loadable({
    loader: component,
    loading: LoadingComponent,
    timeout: 60 * 1000 // 60 seconds
  })
}
