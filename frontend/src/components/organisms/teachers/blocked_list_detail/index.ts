import BlockedListDetail from 'components/organisms/teachers/blocked_list_detail/BlockedListDetail'
import { UserProfile as User } from 'models/userProfile'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  blockedUser: User | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    blockedUser: state.rootReducer.blocks.blockedUser
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(BlockedListDetail)
