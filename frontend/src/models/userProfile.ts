import * as ConversationModels from 'models/conversation'
import * as EvaluationsModels from 'models/evaluations'
import * as SessionsModels from 'models/sessions'

export type PaymentState = 'free' | 'paid' | 'empty' | 'hidden' | 'exempted'

export interface UserProfile {
  absence: number
  conversation_level: number | string | null
  conversations: ConversationModels.UserConversation[]
  country: string
  country_code: string
  desired_condition: number
  evaluate: EvaluationsModels.Satisfaction
  grade: string | null
  highly_reliable: boolean
  hobbies: SessionsModels.Hobbie[]
  id: number
  is_blocked: boolean
  is_favorite: boolean
  lateness: number
  level: number | string | null
  location: string
  name: string
  payment_state: PaymentState
  picture_url: string
  purposes: SessionsModels.Purpose[]
  rated_conversation_level: number | string | null
  sex: number
  timezone: string
  type: string
  username: string
  introduce: any
  email: string
}

export type PageType = 'basic' | 'reservation' | 'complete' | 'block'

export interface ProfilePageProps {
  evaluations: EvaluationsModels.Evaluations | null
  isSelf?: boolean
  type: PageType
  user: UserProfile
  open(): void
  setContents(contents: JSX.Element): void
}
