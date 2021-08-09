import EditHobbies from 'components/organisms/teachers/edit_hobbies/EditHobbies'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  hobbies: SessionsModels.Hobbie[]
  info: TeachersModels.Info
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    hobbies: state.rootReducer.teachers.hobbies,
    info: state.rootReducer.teachers.info
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    register: TeachersActions.register
  }
)

export default enhancer(EditHobbies)
