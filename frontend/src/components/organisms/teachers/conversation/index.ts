import Conversation from 'components/organisms/teachers/conversation/Conversation'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  bandwidth: number
  chats: any[]
  closeSoon: boolean
  conversation: ConversationModels.Conversation | null
  conversationMode: ConversationModels.ConversationMode
  currentTopic: string
  isConnecting: boolean
  isTopicsOpen: boolean
  myId: number
  remainingTime: string
  topics: ConversationModels.Topics
  youAreLate: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    bandwidth: state.rootReducer.conversation.bandwidth,
    chats: state.rootReducer.conversation.chats,
    closeSoon: state.rootReducer.conversation.closeSoon,
    conversation: state.rootReducer.conversation.conversation,
    conversationMode: state.rootReducer.conversation.conversationMode,
    currentTopic: state.rootReducer.conversation.currentTopic,
    isConnecting: state.rootReducer.conversation.isConnecting,
    isTopicsOpen: state.rootReducer.conversation.isTopicsOpen,
    myId: state.rootReducer.teachers.me.id,
    remainingTime: state.rootReducer.conversation.remainingTime,
    topics: state.rootReducer.conversation.topics,
    youAreLate: state.rootReducer.conversation.youAreLate
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    closeModal: ModalActions.close,
    openModal: ModalActions.open,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(Conversation)
