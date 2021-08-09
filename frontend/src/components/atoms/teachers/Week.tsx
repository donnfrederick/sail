import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import calendar, { getDays } from 'utils/calendar'

interface Props {
  reservations: ConversationModels.ConversationResponse | null
  start: string
}

export default (props: Props) => {
  const { reservations, start } = props
  return (
    <Container>
      <YearAndMonth>{getYearAndMonth(start)}</YearAndMonth>
      <Days>{getDays('ja').map(day => <Day key={day}>{day}</Day>)}</Days>
      <Dates>
        {getDates(start).map((date: number, index: number) => (
          <DateElement key={date}>
            {date}
            {reservations &&
            queuedConversationsOnDate(reservations.data)(date).length ? (
              <ReservedDot />
            ) : reservations &&
            waitingConversationsOnDate(reservations.data)(date).length ? (
              <WaitingDot
                data-request={
                  !waitingConversationsOnDate(reservations.data)(date).find(
                    conversation => !conversation.accepting_requests
                  )
                }
              />
            ) : null}
          </DateElement>
        ))}
      </Dates>
    </Container>
  )
}

type StatusType = 'queued' | 'waiting'

const conversationOnDateWithEvent = (statusType: StatusType) => (
  conversations: ConversationModels.Conversation[]
) => (date: number) => {
  const filtered = conversations.filter(conversation => {
    const start = moment.parseZone(conversation.start_at)
    return start.date() === date && conversation.status === statusType
  })

  return filtered
}

const queuedConversationsOnDate = conversationOnDateWithEvent('queued')

const waitingConversationsOnDate = conversationOnDateWithEvent('waiting')

const getYearAndMonth = (datestring: string) => {
  return moment.parseZone(datestring).format('YYYY年MM月')
}

const getDates = (startdate: string) => {
  const date = moment.parseZone(startdate)
  const weeks = calendar(date.year())(date.month() + 1)

  const currentWeek = weeks
    ? weeks.filter(week => {
        return week.includes(Number(date.format('D')))
      })[0]
    : [0]

  const filloutWeek = fillout(currentWeek)
  // 謎の複数次元配列バグを避けるため
  return removeDuplicate(filloutWeek)
}

const fillout = (weekArray: number[], date: number = 1): any => {
  const index = weekArray.indexOf(0)
  if (index === -1) {
    return weekArray
  } else {
    weekArray[index] = date
    return fillout(weekArray, date + 1)
  }
}

// 謎の複数次元配列バグを避けるため
const removeDuplicate = (arr: any[]) => {
  let tempItem: any = null
  let tempIndex = 0
  const newArr: any[] = []
  arr.forEach((item: any, index: number) => {
    if (tempItem === item && item !== 0) {
      newArr[tempIndex] = tempItem - 1
    }
    newArr.push(item)
    tempItem = item
    tempIndex = index
  })
  return newArr
}

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const YearAndMonth = styled.div`
  font-size: 40px;
  font-weight: 500;
  line-height: 1.53;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`

const Days = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  border-bottom: 1px solid #cad5db;
`

const Day = styled.div`
  width: 40px;
  margin: 0 27px;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  color: #405766;
`

const Dates = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
`

const DateElement = styled.div`
  position: relative;
  top: -12px;
  width: 50px;
  margin: 0 22px;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`

const ReservedDot = styled.div`
  position: absolute;
  bottom: -27px;
  right: 0;
  left: 0;
  width: 16px;
  height: 16px;
  margin: auto;
  border-radius: 50%;
  background-color: #1a97fd;
`

const WaitingDot = styled.div`
  position: absolute;
  bottom: -27px;
  right: 0;
  left: 0;
  width: 16px;
  height: 16px;
  margin: auto;
  border-radius: 50%;
  &[data-request='true'] {
    background-color: #a3a3a3;
  }
  &[data-request='false'] {
    background-color: #1a97fd;
  }
`
