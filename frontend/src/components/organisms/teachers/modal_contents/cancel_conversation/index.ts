import CancelConversation from 'components/organisms/teachers/modal_contents/cancel_conversation/CancelConversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'

interface OuterProps {
  page: number
  reservationId: number
  loadAll?: boolean
}

interface Props {
  authToken: string
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    deleteConversations: ConversationActions.deleteConversations,
    getConversations: ConversationActions.getConversations
  }
)

export default enhancer(CancelConversation)
