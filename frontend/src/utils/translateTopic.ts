import { TopicEnumEn, TopicEnumJa } from 'models/conversation'

export type TargetLang = 'en' | 'ja'

export const translateTopic = (targetLang: TargetLang) => (topic: string) => {
  // ブロードキャストされているトピックスは必ず en のトピックス
  const key = TopicEnumEn[topic] !== undefined ? TopicEnumEn[topic] : null

  if (key === null) {
    return ''
  }

  return targetLang === 'en'
    ? TopicEnumEn[key]
    : targetLang === 'ja'
      ? TopicEnumJa[key]
      : ''
}

export const translateTopicToEnglish = translateTopic('en')

export const translateTopicToJapanese = translateTopic('ja')

export default translateTopic
