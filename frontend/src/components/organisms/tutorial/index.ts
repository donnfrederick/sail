import Tutorial from 'components/organisms/tutorial/Tutorial'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TutorialActions from 'reducers/tutorial'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  shouldShow: boolean
  showConfirmation: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    shouldShow: state.rootReducer.tutorial.shouldShow,
    showConfirmation: state.rootReducer.teachers.showConfirmation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    hide: TutorialActions.hide,
    show: TutorialActions.show
  }
)

export default enhancer(Tutorial)
