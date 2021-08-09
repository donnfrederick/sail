import ConfitmUnblock from 'components/organisms/teachers/modal_contents/confirm_unblock/ConfirmUnblock'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as BlocksActions from 'reducers/blocks'
import * as ModalActions from 'reducers/modal'

interface OuterProps {
  blockedUserId: number
}

interface Props {
  authToken: string
  blockedUserId: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token,
    blockedUserId: props.blockedUserId
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    deleteBlocks: BlocksActions.deleteBlocks,
    setContents: ModalActions.setContents
  }
)

export default enhancer(ConfitmUnblock)
