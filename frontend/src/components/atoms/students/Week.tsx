import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import calendar, { getDays } from 'utils/calendar'

interface Props {
  reservations: ConversationModels.ConversationResponse
  start: string
}

export default (props: Props) => {
  const { reservations, start } = props
  return (
    <Container>
      <YearAndMonth>{getYearAndMonth(start)}</YearAndMonth>
      <Days>{getDays('en').map(day => <Day key={day}>{day}</Day>)}</Days>
      <Dates>
        {getDates(start).map((date: number, index: number) => (
          <DateElement key={date}>
            {date}
            {reservations &&
            conversationsOnDate(reservations.data, date).length ? (
              <Dot
                data-request={
                  !conversationsOnDate(reservations.data, date).find(
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

const conversationsOnDate = (
  conversations: ConversationModels.Conversation[],
  date: number
) => {
  const filtered = conversations.filter(conversation => {
    const start = moment.parseZone(conversation.start_at)
    const filteredConversationStatus =
      conversation.status === 'queued' || conversation.accepting_requests
    return start.date() === date && filteredConversationStatus
  })

  return filtered
}

const getYearAndMonth = (datestring: string) => {
  return moment.parseZone(datestring).format('MMMM YYYY')
}

const getDates = (startdate: string) => {
  const date = moment.parseZone(startdate)
  const weeks = calendar(date.year())(date.month() + 1)

  const currentWeek = weeks
    ? weeks.filter(week => {
        return week.includes(Number(date.format('D')))
      })[0]
    : [0]

  return fillout(currentWeek)
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

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const YearAndMonth = styled.div`
  margin-bottom: 24px;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: #405766;
`

const Days = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #cad5db;
`

const Day = styled.div`
  width: 60px;
  margin: 0 13.5px;
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
  height: 110px;
  box-sizing: border-box;
`

const DateElement = styled.div`
  position: relative;
  top: -12px;
  width: 44px;
  margin: 0 22px;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: #405766;
`

const Dot = styled.div`
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
