import { Me as User } from 'models/sessions'

export interface Reason {
  id: number
  name: string
}

export interface AccusationsRequest {
  conversation_id: number
  user_id: number
  accusation_reason_id: number
}

export interface Conversation {
  id: number
  status: string
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
  channel_id: string
}

export interface AccusationsResponse {
  conversation: Conversation
  from_user: User
  to_user: User
}
