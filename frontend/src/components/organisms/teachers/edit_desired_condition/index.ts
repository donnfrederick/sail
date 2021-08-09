import EditDesiredCondition from 'components/organisms/teachers/edit_desired_condition/EditDesiredCondition'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  info: TeachersModels.Info
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    info: state.rootReducer.teachers.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    register: TeachersActions.register
  }
)

export default enhancer(EditDesiredCondition)
