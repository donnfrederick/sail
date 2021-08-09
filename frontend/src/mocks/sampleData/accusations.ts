import { conversation as sampleConversation } from 'mocks/sampleData/conversation'
import { me } from 'mocks/sampleData/me'
import * as AccusationsModels from 'models/accusations'

export const reasons: AccusationsModels.Reason[] = [
  {
    id: 1,
    name: 'reason 1'
  },
  {
    id: 2,
    name: 'reason 2'
  },
  {
    id: 3,
    name: 'reason 3'
  }
]

export const accusationsResponse: AccusationsModels.AccusationsResponse = {
  conversation: sampleConversation,
  from_user: me,
  to_user: me
}
