import { Conversation } from 'models/conversation'

export interface GetConversationHistoryRequest {
  page?: number
  per_page?: number
}

export interface PostConversationHistoryRequest {
  user_id: number
}

export interface DeleteConversationHistoryRequest {
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

export interface GetConversationHistoryResponse {
  data: Conversation[]
  meta: Meta
}
