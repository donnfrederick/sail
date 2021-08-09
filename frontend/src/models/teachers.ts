import * as SessionsModels from 'models/sessions'

export interface Info {
  email: string
  password: string
  name: string
  gender: string
  picture: string
  hobbies: string[]
  purposes: string[]
  desiredCondition: string
  introduce: string
  categories: SessionsModels.Category[]
  tags: SessionsModels.Tag[]
  added_tags: SessionsModels.AddedTag[]
  selected_tags: SessionsModels.SelectedTag[]
}

export interface Teacher {
  email: string
  password: string
  name: string
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
  sex?: number
  desired_condition?: number
}

export enum GenderEnum {
  '未登録' = 0,
  '男性' = 1,
  '女性' = 2,
  '適用不能' = 9
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
