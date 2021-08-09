import enumToObject from 'utils/enumToObject'

export type EvaluationType = 'progress' | 'completed'

export interface UnratedConversation {
  timestamp: string
  id: number
}

export interface Memo {
  timestamp: string
  memo: string
}

export interface Report {
  timestamp: string
  report: string
}

export interface Evaluations {
  unrated_conversations: UnratedConversation[]
  memos: Memo[]
  reports: Report[]
}

export interface Satisfaction {
  1: number | string
  2: number | string
  3: number | string
  4: number | string
}

export type FunUnion = 0 | 1 | 2 | 3 | 4 | 5
export type AbilityUnion = 0 | 1 | 2 | 3 | 4 | 5
export type TimeUnion = 0 | 1 | 2 | 3 | 4
export type QualityUnion = 1 | 2 | 3 | 4

export interface Questionnaire {
  fun: FunUnion
  ability?: AbilityUnion
  time: TimeUnion
  quality: QualityUnion[]
}

export type StateHook<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export interface ComponentProps {
  stepState: StateHook<number>
  isTeacher: boolean
}

interface QuestionnaireItem<T> {
  student: T[]
  teacher: T[]
}

export interface QuestionnaireChoice<QuestionnaireT = number> {
  text: string
  value: QuestionnaireT
}

export interface SatisfactionChoiceProps extends QuestionnaireChoice<FunUnion> {
  emojiName: string
}

export const headerTexts: QuestionnaireItem<string[]> = {
  student: [
    [
      'WELL DONE!',
      'You quitted the video chat in the middle the conversation.\nPlease rate the conversation.\nYou can also report if there is any issue with your conversation partner.'
    ],
    ['How was the Conversation?', 'Please choose one.'],
    ['Did the Senior Show Up On Time?', 'Please choose one.'],
    [
      'How was the Video and Voice Quality?',
      'How was the quality of the voice, video, and the surrounding environment of your conversation partner?\nTap "Finish" button if you found no issue.\n※ You can choose more than one'
    ],
    [
      'Write a Conversation Memo',
      'Later you can refer to this memo to check what kind of conversation you had with this partner.\n※ Only you can see the memo.'
    ],
    ['Thank You!', 'What is "Favorite"?'],
    ['Tell us Why', '※ You can choose more than one'],
    ['Tell Us the Detail of the Issue'],
    ['Confirm Report']
  ],
  teacher: [
    [
      'お疲れ様でした',
      '会話を途中で終了されましたが、\nこの方との会話はいかがでしたか？\n次回の会話のために評価をお願いします。\n問題があった場合は評価後に問題報告が\nできます。'
    ],
    ['この方との会話は楽しめましたか？', 'どれか１つだけ選んでください。'],
    ['この方の日本語レベルはどうでしたか？', 'どれか１つだけ選んでください。'],
    ['相手の方は時間通りに現れましたか？', 'どれか１つだけ選んでください。'],
    [
      '映像や音声の品質はどうでしたか？',
      '会話した方の音声や周囲の環境（雑音など）、映像はいかがでしたか？\n問題ない場合はそのまま終わりを押してください。\n※ 複数選択可'
    ],
    [
      'この方との会話のメモを残せます',
      'メモを残しておくと、次回会話するときに何を話したのか確認できるので便利です。\n※ メモはあなただけが見れるものです。'
    ],
    ['ありがとうございました', 'お気に入りとは？'],
    ['報告理由を教えてください', '※ 複数選択可'],
    ['よろしければ詳細を教えてください'],
    ['この内容で報告しますか？']
  ]
}

const emojiNameArr = [
  'smiley_humorous',
  'smiley_impressed',
  'smiley_discovered',
  'smiley_fine',
  'smiley_uncomfortable'
]

export enum satisfactionStudentEnum {
  'Very humorous' = 1,
  'Impressed',
  'Discovered new',
  'Nice and fine',
  'Uncomfortable'
}

export enum satisfactionTeacherEnum {
  '談笑できた' = 1,
  '感動した',
  '新しい発見があった',
  'その他よかった',
  '不満がある'
}

export enum japaneseLevelEnum {
  'スムーズに会話ができた' = 1,
  'たまに単語が出ないでつまづいた',
  '続くけどしどろもどろ',
  'あまり続かない',
  'まったく会話にならない'
}

export enum punctualityStudentEnum {
  'On time' = 1,
  'A little late',
  'Late for more than 5 minutes',
  'Did not show up'
}

export enum punctualityTeacherEnum {
  '時間通りに来た' = 1,
  '少し遅刻した',
  '5分以上遅刻した',
  'こなかった'
}

export enum chatQualityStudentEnum {
  'The video lags occasionally' = 1,
  'The video did not appear',
  'Lots of surrounding noises',
  'The voice occasionally gets interrupted'
}

export enum chatQualityTeacherEnum {
  '映像がたまに切れてた' = 1,
  'まったく映らなかった',
  '周囲の雑音が多かった',
  '音声がブツブツ切れてた'
}

enum reportReasonStudentEnum {
  'Recommendation of other services' = 1,
  'Spam',
  'Obscenity/Asking for a meeting',
  'Criminal/Illegal act',
  'Others/Troubling act'
}

enum reportReasonTeacherEnum {
  '他サービスへの勧誘行為' = 1,
  'スパム・宣伝目的',
  '出会い・わいせつ目的',
  '犯罪・違法行為',
  'その他、迷惑行為'
}

const satisfactionChoiceObjBuilder = (satisfactionEnum: any) =>
  enumToObject<FunUnion>(satisfactionEnum).map(
    (choice: QuestionnaireChoice<FunUnion>, index: number) => ({
      ...choice,
      emojiName: emojiNameArr[index]
    })
  )

export const satisfactionChoices: QuestionnaireItem<SatisfactionChoiceProps> = {
  student: satisfactionChoiceObjBuilder(satisfactionStudentEnum),
  teacher: satisfactionChoiceObjBuilder(satisfactionTeacherEnum)
}

export const japaneseLevelChoices: QuestionnaireChoice<
  AbilityUnion
>[] = enumToObject<AbilityUnion>(japaneseLevelEnum)

export const punctualityChoices: QuestionnaireItem<
  QuestionnaireChoice<TimeUnion>
> = {
  student: enumToObject<TimeUnion>(punctualityStudentEnum),
  teacher: enumToObject<TimeUnion>(punctualityTeacherEnum)
}
export const chatQualityChoices: QuestionnaireItem<
  QuestionnaireChoice<QualityUnion>
> = {
  student: enumToObject<QualityUnion>(chatQualityStudentEnum),
  teacher: enumToObject<QualityUnion>(chatQualityTeacherEnum)
}

export const reportReasonChoices: QuestionnaireItem<QuestionnaireChoice> = {
  student: enumToObject(reportReasonStudentEnum),
  teacher: enumToObject(reportReasonTeacherEnum)
}
