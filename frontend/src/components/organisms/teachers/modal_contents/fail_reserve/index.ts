import FailFetching from 'components/organisms/teachers/modal_contents/fail_reserve/FailReserve'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

interface OuterProps {
  error?: any
}

// tslint:disable-next-line
interface Props {}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    error: props.error
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(FailFetching)
