import RequestUserDetail from 'components/organisms/teachers/request_user_detail/RequestUserDetail'
import { RequestConversationInConversation } from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  teachersRequestConversation: RequestConversationInConversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    teachersRequestConversation:
      state.rootReducer.conversation.teachersRequestConversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(RequestUserDetail)
