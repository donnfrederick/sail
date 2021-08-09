import * as EvaluationsModels from 'models/evaluations'

export interface Me {
  absence: number
  auth_token: string
  birthday: string
  conversation_level: number | null
  conversations: any[]
  country: string
  desired_condition: number
  email: string
  evaluate: EvaluationsModels.Satisfaction
  grade: string | null
  hobbies: Hobbie[]
  id: number
  lateness: number
  level: number | null
  location: string
  name: string
  name_ja: string // 第二言語名を入れるための変数（Studentだと日本語名が入る、Teacherでは今のところ使ってない）
  organization_device: any
  organization_sections: any[]
  organizations: any[]
  picture_url: string
  purposes: Purpose[]
  rated_conversation_level: number | null
  sex: number
  timezone: string
  type: string
  username: string
  web_socket_token: string
  introduce: string
}

export interface SigninRequest {
  email: string
  password: string
  fcm_token?: string
}

export interface Hobbie {
  id: string
  name: string
}

export interface Purpose {
  id: string
  name: string
}

export interface Category {
  id: number
  name_jp: string
  name_en: string
  name_indo: string
  name_vietnam: string
  name_china: string
  name_taiwan: string
  name_taly: string
  name_spain: string
  name_france: string
  color: string
}

export interface Tag {
  id: number
  name_jp: string
  name_en: string
  name_indo: string
  name_vietnam: string
  name_china: string
  name_taiwan: string
  name_taly: string
  name_spain: string
  name_france: string
  category_id: number
}

export interface SelectedTag {
  id: number
  tag_id: number
  user_email: string
  tag_name: string
}

export interface AddedTag {
  id: number
  name_jp: string
  name_en: string
  name_indo: string
  name_vietnam: string
  name_china: string
  name_taiwan: string
  name_taly: string
  name_spain: string
  name_france: string
  category_id: number
}