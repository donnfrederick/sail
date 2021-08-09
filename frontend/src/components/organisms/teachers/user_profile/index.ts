import UserProfile from 'components/organisms/teachers/user_profile/UserProfile'
import * as EvaluationsModels from 'models/evaluations'
import * as UserProfileModels from 'models/userProfile'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {
  type: string
  user: UserProfileModels.UserProfile | null
}

interface Props {
  evaluations: EvaluationsModels.Evaluations | null
  type: string
  user: UserProfileModels.UserProfile | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    evaluations: state.rootReducer.evaluations.data,
    type: props.type,
    user: props.user
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(UserProfile)
