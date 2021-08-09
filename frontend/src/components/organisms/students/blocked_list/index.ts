import BlockedList from 'components/organisms/students/blocked_list/BlockedList'
import * as BlocksModels from 'models/blocks'
import { UserProfile as User } from 'models/userProfile'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as BlocksActions from 'reducers/blocks'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  blocks: User[]
  meta: BlocksModels.Meta
  page: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    blocks: state.rootReducer.blocks.blocks,
    meta: state.rootReducer.blocks.meta,
    page: state.rootReducer.blocks.page
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    forward: BlocksActions.forward,
    getBlocks: BlocksActions.getBlocks
  }
)

export default enhancer(BlockedList)
