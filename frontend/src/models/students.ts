import * as SessionsModels from 'models/sessions'

export interface Info {
  email: string
  password: string
  current_password: string
  phone_number?: string
  code?: string
  name: string
  name_ja: string
  gender: number
  picture: string
  conversation_level: number
  level: number
  country: string
  timezone: string
  desired_condition: number
  hobbies: SessionsModels.Hobbie[]
  purposes: SessionsModels.Purpose[]
  introduce: string
  categories: SessionsModels.Category[]
  tags: SessionsModels.Tag[]
  selected_tags: SessionsModels.SelectedTag[]
  added_tags: SessionsModels.AddedTag[]
  sysp_nl: string
}

export interface Student {
  email: string
  password: string
  password_confirmation?: string
  name: string
  name_ja: string
  sex: number
  picture: string
  level: number
  country: string
  timezone: string
  hobbies: number[]
  purposes: number[]
  fcm_token?: string
  phone_number?: string
}

export interface PhoneAuthenticationRequest {
  country: string
  phone_number: string
}

export interface PhoneCodeValidationRequest {
  code: string
  country: string
  phone_number: string
}

export interface ValidationRequest {
  email?: string
  password?: string
  phone_number?: string
  code?: string
  name?: string
  sex?: number
  level?: number
  country?: string
  timezone?: string
}

interface LevelOption {
  show?: boolean
  text: string
  value: number
  intlid?: string
}

export enum GenderEnum {
  'Unselected' = 0,
  'Male' = 1,
  'Female' = 2,
  'Other' = 9
}

export enum HobbieEnum {
  'Cooking' = 1,
  'Reading',
  'Sports',
  'History',
  'Music',
  'Art',
  'Philosophy',
  'Travel',
  'Society'
}

export enum PurposeEnum {
  'To improve Japanese language ability' = 1,
  'To immigrate to Japan',
  'To work in Japan',
  'To comprehend Japanese culture'
}

export const JapaneseConversationLevelArr: LevelOption[] = [
  {
    show: false,
    text: 'Not set',
    value: 0
  },
  {
    show: true,
    text: 'Little to no understanding',
    value: 1
  },
  {
    show: true,
    text: 'Knowledge of basic vobaulary',
    value: 2
  },
  {
    show: true,
    text: 'Able to form simple sentences',
    value: 3
  },
  {
    show: true,
    text: 'Daily conversation level',
    value: 4
  },
  {
    show: true,
    text: 'Able to handle complex topics',
    value: 5
  }
]

export const JLPTLevelArr: LevelOption[] = [
  {
    text: 'I have never taken the JLPT',
    value: -10,
    intlid: 'edit.not_taken_jlpt'
  },
  {
    text: 'I have never passed the JLPT',
    value: -1,
    intlid: 'edit.not_passed_jlpt'
  },
  {
    text: 'N5',
    value: 5,
    intlid: 'jlpt_5'
  },
  {
    text: 'N4',
    value: 4,
    intlid: 'jlpt_4'
  },
  {
    text: 'N3',
    value: 3,
    intlid: 'jlpt_3'
  },
  {
    text: 'N2',
    value: 2,
    intlid: 'jlpt_2'
  },
  {
    text: 'N1',
    value: 1,
    intlid: 'jlpt_1'
  }
]

const levelToText = (levelArr: LevelOption[], value: number) => {
  const specifiedLevel = levelArr.find(level => level.value === value)
  return specifiedLevel ? specifiedLevel.text : ''
}

export const JLPTLevelToText = (value: number) =>
  levelToText(JLPTLevelArr, value)

export const JapaneseConversationLevelToText = (value: number) =>
  levelToText(JapaneseConversationLevelArr, value)
