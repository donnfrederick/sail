import * as SessionsModels from 'models/sessions'

export interface Info {
  email: string
  password: string
  name: string
  preferred_name: number
  gender: string
  custom_gender: string
  picture: string
  hobbies: string[]
  purposes: string[]
  desiredCondition: string
  introduce: string
}

export interface Teacher {
  email: string
  password: string
  name: string
  preferred_name: number
  sex: number
  picture: string
  hobbies: SessionsModels.Hobbie[]
  purposes: SessionsModels.Purpose[]
  desired_condition: number
  fcm_token?: string
}

export interface ValidationRequest {
  email?: string
  password?: string
  name?: string
  preferred_name?: number
  sex?: number
  desired_condition?: number
}

export enum PreferredNameEnum {
  'フルネーム' = 1,
  'めい' = 2,
  'せい' = 3
}

export enum GenderEnum {
  '未登録' = 0,
  '男性' = 1,
  '女性' = 2,
  '言いたくありません' = 3,
  'その他' = 9
}

export enum HobbieEnum {
  '料理' = 1,
  '読書',
  'スポーツ',
  '歴史',
  '音楽',
  '芸術',
  '哲学',
  '旅行',
  '社会'
}

export enum PurposeEnum {
  '若い人との会話を楽しみたい' = 1,
  '若い世代に貢献したい',
  '仕事や日常の経験を伝えたい',
  '日本語を教えたい'
}

export enum DesiredConditionEnum {
  '日本語が得意な方がいい' = 1,
  '日本語が不得意でも構わない'
}
