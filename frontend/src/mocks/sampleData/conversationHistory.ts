import { conversation } from 'mocks/sampleData/conversation'
import * as ConversationHistoryModels from 'models/conversationHistory'

export const conversationHistory: ConversationHistoryModels.GetConversationHistoryResponse = {
  meta: {
    current_page: 0,
    per_page: 2,
    previous_page: 1,
    next_page: 3,
    total_pages: 5,
    total_entries: 10
  },
  data: [conversation]
}
