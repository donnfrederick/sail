export type IssueType = 'free' | 'stripe' | 'paypal'

export interface Issue {
  type: IssueType
  failure_code: string | null
  failure_message: string | null
  conversations: number
  expired_at: string | null
  created_at: string
  updated_at: string
}

export interface GetIssuesResponse {
  issues: Issue[] | null
  lang: string | null
  gracing: boolean
}
