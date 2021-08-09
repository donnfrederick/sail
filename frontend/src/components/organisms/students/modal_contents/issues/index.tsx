import Issues from 'components/organisms/students/modal_contents/issues/Issues'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {
  lang: string | null
  gracing: boolean | null
}

interface Props {
  lang: string | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    lang: state.rootReducer.issues.lang
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(Issues)
