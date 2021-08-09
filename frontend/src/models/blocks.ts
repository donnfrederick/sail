import { UserProfile as User } from 'models/userProfile'

export interface GetBlocksRequest {
  page?: number
  per_page?: number
}

export interface PostBlocksRequest {
  user_id: number
}

export interface DeleteBlocksRequest {
  user_id: number
}

export interface Meta {
  current_page: number
  per_page: number
  previous_page: number | null
  next_page: number | null
  total_pages: number
  total_entries: number
}

export interface GetBlocksResponse {
  data: User[]
  meta: Meta
}
