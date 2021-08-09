import ConversationHistoryDetail from 'components/organisms/students/conversation_history_detail/ConversationHistoryDetail'
import { Conversation } from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  conversation: Conversation | null
  myId: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    conversation: state.rootReducer.conversation.conversation,
    myId: state.rootReducer.students.me.id
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(ConversationHistoryDetail)
