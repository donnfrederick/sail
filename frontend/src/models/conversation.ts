import { Questionnaire } from 'models/evaluations'
import { UserProfile as User } from 'models/userProfile'

export type TimeSelectType = 'from' | 'zone'

export type ConversationMode = 'soundOnly' | 'video'

export type ReservationType = 'anyone' | 'request'

export interface Response {
  channel_id: string
  chats: any[]
  id: number
  status: string
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
  users: any[]
}

export interface ConversationRequestPostParams {
  reservable_conversation_id: number
  start_at: string
}

export interface Request {
  accepting_requests: number
  start_at: string
  end_at: string
}

export interface ConversationRequest {
  start_on?: string
  end_on?: string
  term?: 'week' | 'month'
  page?: number
}

export interface UserConversation {
  accepting_requests: boolean
  channel_id: string
  chats: any[]
  id: number
  status: string
  statuses: ConversationStatus[]
  start_at: string
  end_at: string
  evaluate: ConversationRate<Evaluate>[]
  memos: ConversationRate<Memo>[]
  reports: ConversationRate<Report>[]
  created_at: string
  updated_at: string
  with_self: boolean
}

export interface Chats {
  content: string
  conversation_id: number
  created_at: string
  user_picture_url: string
  id: number
  updated_at: string
  user_id: number
}

export interface Conversation {
  accepting_requests: boolean
  available: boolean
  channel_id: string
  chats: Chats[]
  id: number
  status: string
  statuses: ConversationStatus[]
  start_at: string
  end_at: string
  evaluate: ConversationRate<Evaluate>[]
  memos: ConversationRate<Memo>[]
  reports: ConversationRate<Report>[]
  created_at: string
  updated_at: string
  users: User[]
  conversation_requests: RequestConversationInConversation[]
}

export interface RequestConversation {
  conversation: Conversation
  end_at: string
  id: number
  start_at: string
  user: User
}

export interface RequestConversationInConversation {
  end_at: string
  id: number
  start_at: string
  user: User
}

export interface CancelledConversation {
  conversation_id: number
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
  users: User[]
}

export interface Meta {
  start_on: string
  end_on: string
}

export interface ServerTime {
  current_time: string
  current_time_epoch: number
  end_at: string
  end_at_epoch: number
}

export interface ConversationResponse {
  data: Conversation[]
  meta: Meta
}

export interface RequestConversationResponse {
  data: RequestConversation[]
}

export interface Calendar {
  [date: string]: {
    is_enabled: boolean
    is_reserved: boolean
  }
}

export interface Topics {
  [key: string]: string
}

export type ConversationStatusValue = 'Ontime' | 'Late' | 'Absent'

export interface ConversationStatus {
  user_id: number
  status: ConversationStatusValue
}

export type ConversationRate<T> = { [P in keyof T]: T[P] } & { user_id: number }

interface Memo {
  memo: string
}
interface Evaluate {
  evaluate: Questionnaire
}

interface Report {
  report: ReportContentRequest
}
export type ReportReasonsUnion = 1 | 2 | 3 | 4 | 5

export interface ReportContentRequest {
  report_detail: string
  report_reasons: ReportReasonsUnion[]
}

export enum TopicEnumJa {
  '料理',
  '読書',
  'スポーツ',
  '歴史',
  '音楽',
  '芸術',
  '哲学',
  '旅行',
  '社会'
}

export enum TopicEnumEn {
  'Cooking',
  'Reading',
  'Sports',
  'History',
  'Music',
  'Art',
  'Philosophy',
  'Travel',
  'Society'
}
