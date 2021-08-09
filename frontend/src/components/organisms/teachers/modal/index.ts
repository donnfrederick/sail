import Modal from 'components/organisms/teachers/modal/Modal'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  contents: JSX.Element | null
  isOpened: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    contents: state.rootReducer.modal.contents,
    isOpened: state.rootReducer.modal.isOpened
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(Modal)
