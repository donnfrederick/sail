import withCalendar from 'hocs/withCalendar'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getCalendar, { getDays } from 'utils/calendar'
import { isPast } from 'utils/isToday'
import zeroPadding from 'utils/zeroPadding'

interface Props {
  calendar: ConversationModels.Calendar
  year: number
  month: number
  selectDate(date: string): void
}

export default withCalendar((props: Props) => {
  const { calendar, year, month, selectDate } = props
  const weeks = getCalendar(year)(month)
  if (!weeks) {
    return <Container />
  }

  return (
    <Container>
      {getDays('ja').map(day => (
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
                onClick={() =>
                  selectDate(
                    `${year}-${zeroPadding(month)}-${zeroPadding(date)}`
                  )
                }
                data-status={
                  isPast(year, month, date)
                    ? 'past'
                    : calendar[date]
                      ? calendar[date].is_reserved
                        ? 'reserved'
                        : calendar[date].is_enabled
                          ? null
                          : 'unavailable'
                      : null
                }
              >
                {date}
              </DateContainer>
            )
        )
      )}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  min-height: 600px;
  box-sizing: border-box;
  margin-bottom: 48px;
  padding-top: 45px;
  background-image: linear-gradient(307deg, #2eb1ff, #138efd);
`

const DateContainer = styled.div`
  position: relative;
  width: 48px;
  margin: 0 29px 56px;
  font-size: 40px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;

  &[data-day-line='true'] {
    margin-bottom: 48px;
    font-size: 32px;
    opacity: 0.8;
  }

  &[data-status] {
    &::after {
      display: block;
      position: absolute;
      top: 46px;
      left: -23px;
      width: 96px;
      height: 34px;
      border-radius: 18px;
      background-color: #ffffff;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 0px;
      text-align: center;
      line-height: 34px;
    }
  }
  &[data-status='past'] {
    pointer-events: none;
    color: rgba(255, 255, 255, 0.5);
  }
  &[data-status='reserved'] {
    color: #92ffa3;
    &::after {
      color: #2ca2cd;
      content: '予約中';
    }
  }
  &[data-status='unavailable'] {
    pointer-events: none;
    color: rgba(255, 255, 255, 0.5);
    &::after {
      color: #f16e88;
      content: '予約不可';
    }
  }
`
