import { userProfile as user } from 'mocks/sampleData/userProfile'
import * as BlocksModels from 'models/blocks'

export const blocks: BlocksModels.GetBlocksResponse = {
  meta: {
    current_page: 0,
    per_page: 2,
    previous_page: 1,
    next_page: 3,
    total_pages: 5,
    total_entries: 10
  },
  data: [user]
}

export const blockedUser = user
