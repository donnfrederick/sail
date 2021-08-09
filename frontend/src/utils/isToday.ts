import moment from 'moment'

export const isToday = (startTime: string) => {
  const start = moment.parseZone(startTime)
  const now = moment()
  const diff = start.diff(now, 'days')

  return diff <= 0 ? true : false
}

export const isNotToday = (startTime: string) => !isToday(startTime)

export const isPast = (year: number, month: number, date: number) => {
  const current = moment(`${year}-${month}-${date}`, 'YYYY-M-D')
  const now = moment()
  const diff = current.diff(now, 'days')

  return diff < 0 ? true : false
}
