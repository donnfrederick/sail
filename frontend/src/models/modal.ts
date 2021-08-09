export type AnswerType = 'question' | 'confirmation'

export interface Contents {
  answerType: AnswerType
  buttons: {
    noAction: () => void | null
    noText: string
    yesAction: () => void | Promise<void> | null
    yesLink: string
    yesText: string
  }
  heading: string
  reservedDate: {
    date: string
    time: string
  }
  text: string
}
