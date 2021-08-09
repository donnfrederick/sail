import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import getCalendarArray, { getDays } from 'utils/calendar'
import { isPast } from 'utils/isToday'
import zeroPadding from 'utils/zeroPadding'

interface Props {
  authToken: string
  calendar: ConversationModels.Calendar
  year: number
  month: number
  selectedDate: string
  getRecommend(authToken: string, date: string): void
  selectDate(date: string): void
}

export default (props: Props) => {
  const {
    authToken,
    calendar,
    year,
    month,
    selectedDate,
    getRecommend,
    selectDate
  } = props

  const weeks = getCalendarArray(year)(month)
  if (!weeks) {
    return <Container />
  }

  return (
    <Container>
      {getDays('en').map(day => (
        <DateContainer data-day-line="true" key={day}>
          {day}
        </DateContainer>
      ))}
      {weeks.map(week =>
        week.map(
          (date, index) =>
            date === 0 ? (
              <DateContainer key={year + month + index} />
            ) : (
              <DateContainer
                key={date}
                data-selected={
                  year === moment(selectedDate).year() &&
                  month === moment(selectedDate).month() + 1 &&
                  date === moment(selectedDate).date()
                }
                data-disabled={
                  isPast(year, month, date) ||
                  (calendar[date]
                    ? calendar[date].is_enabled
                      ? 'false'
                      : 'true'
                    : 'false')
                }
                data-status={
                  calendar[date]
                    ? calendar[date].is_reserved
                      ? 'reserved'
                      : null
                    : null
                }
                onClick={() => {
                  selectDate(
                    `${year}-${zeroPadding(month)}-${zeroPadding(date)}`
                  )
                  getRecommend(
                    authToken,
                    `${year}-${zeroPadding(month)}-${zeroPadding(date)}`
                  )
                }}
              >
                {date}
              </DateContainer>
            )
        )
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 25px 0 40px;
`

const DateContainer = styled.div`
  position: relative;
  width: 62px;
  height: 62px;
  margin: 0 17px 24px;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 62px;
  text-align: center;
  color: #405766;

  &[data-day-line='true'] {
    font-size: 28px;
    font-weight: 500;
    color: #405766;
  }

  &[data-selected='true'] {
    width: 66px;
    height: 66px;
    margin: 0 15px 20px;
    border-radius: 50%;
    background-color: #138efd;
    line-height: 66px;
    color: #ffffff;
  }

  &[data-disabled='true'] {
    pointer-events: none;
    color: rgba(64, 87, 102, 0.3);
  }

  &[data-status='reserved'] {
    &::after {
      display: block;
      position: absolute;
      top: 62px;
      right: 0;
      left: 0;
      width: 12px;
      height: 12px;
      margin: auto;
      border-radius: 50%;
      background-color: #1cdfb9;
      content: '';
    }
  }
`
