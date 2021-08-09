import * as ConversationModels from 'models/conversation'

export default (
  conversation:
    | ConversationModels.Conversation
    | ConversationModels.CancelledConversation,
  myId: number
) => conversation.users.find(user => user.id !== myId)
