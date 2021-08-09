import moment from 'moment'
import { getDays } from 'utils/calendar'

type Lang = 'ja' | 'en'

export const getModalDate = (datetime: string, lang: Lang) => {
  const startdate = moment.parseZone(datetime)

  return lang === 'ja'
    ? startdate.format(`YYYY年M月D日(${getDays('ja')[startdate.day()]})`)
    : startdate.format(`dddd D MMMM`)
}

export const getModalTime = (
  startTime: string,
  endTime: string,
  lang: Lang
) => {
  const startdate = moment.parseZone(startTime)
  const enddate = moment.parseZone(endTime)

  return lang === 'ja'
    ? `${startdate.format('HH:mm')} - ${enddate.format('HH:mm')}`
    : `${startdate.format('h:mm a')} - ${enddate.format('h:mm a')}`
}

const justnow = (lang: Lang) => (lang === 'ja' ? 'たった今' : 'now')
const aMinuteAgo = (lang: Lang) => (lang === 'ja' ? '1分前' : 'a minute ago')
const fewMinutesAgo = (lang: Lang) => (lang === 'ja' ? '分前' : ' minutes ago')
const aHourAgo = (lang: Lang) => (lang === 'ja' ? '1時間前' : 'a hour ago')
const fewHoursAgo = (lang: Lang) => (lang === 'ja' ? '時間前' : ' hours ago')
const calcElapsedMinutes = (elapsedTime: number) => {
  return (
    (Math.floor(elapsedTime / 60) < 10 ? ' ' : '') +
    Math.floor(elapsedTime / 60)
  )
}
const calcElapsedHours = (elapsedTime: number) => {
  return (
    (Math.floor(elapsedTime / 3600) < 10 ? ' ' : '') +
    Math.floor(elapsedTime / 3600)
  )
}

const getAbsoluteTime = (datetime: string, lang: Lang = 'ja') => {
  return lang === 'ja'
    ? moment.parseZone(datetime).format('YYYY/M/D')
    : moment.parseZone(datetime).format('MMMM D, YYYY')
}

const getRelativeTime = (elapsedTime: number, lang: Lang = 'ja') => {
  return elapsedTime < 60
    ? justnow(lang)
    : elapsedTime < 120
      ? aMinuteAgo(lang)
      : elapsedTime < 60 * 60
        ? `${calcElapsedMinutes(elapsedTime)}${fewMinutesAgo(lang)}`
        : elapsedTime < 120 * 60
          ? aHourAgo(lang)
          : elapsedTime < 24 * 60 * 60
            ? `${calcElapsedHours(elapsedTime)}${fewHoursAgo(lang)}`
            : null
}

const isWithinOneDay = (elapsedTime: number) => elapsedTime < 24 * 60 * 60

export default (datetime: string, lang: Lang = 'ja') => {
  const baseTime = moment()
  const targetTIme = moment.parseZone(datetime)
  const elapsedTime = Math.ceil(baseTime.diff(targetTIme) / 1000)

  return isWithinOneDay(elapsedTime)
    ? getRelativeTime(elapsedTime, lang)
    : getAbsoluteTime(datetime, lang)
}
