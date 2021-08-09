import CalendarBody from 'components/atoms/students/CalendarBody'
import CalendarHead from 'components/atoms/students/CalendarHead'
import withCalendar from 'hocs/withCalendar'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getCalendarArray from 'utils/calendar'
import isHuawei from 'utils/isHuawei'

interface Props {
  authToken: string
  calendar: ConversationModels.Calendar
  year: number
  month: number
  selectedDate: string
  changeYear(year: number): void
  changeMonth(month: number): void
  getCalendar(authToken: string, year: number, month: number): void
  getRecommend(authToken: string, date: string): void
  resetRecommendedReservations(): void
  selectDate(date: string): void
}

export default withCalendar((props: Props) => {
  const {
    authToken,
    calendar,
    year,
    month,
    selectedDate,
    changeYear,
    changeMonth,
    getCalendar,
    getRecommend,
    resetRecommendedReservations,
    selectDate
  } = props
  const weeks = getCalendarArray(year)(month)
  if (!weeks) {
    return <Container />
  }

  return (
    <Container>
      <CalendarHead
        authToken={authToken}
        year={year}
        month={month}
        changeYear={changeYear}
        changeMonth={changeMonth}
        getCalendar={getCalendar}
        resetRecommendedReservations={resetRecommendedReservations}
      />
      <CalendarBody
        authToken={authToken}
        calendar={calendar}
        year={year}
        month={month}
        selectedDate={selectedDate}
        getRecommend={getRecommend}
        selectDate={selectDate}
      />
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 2px 16px 0 rgba(5, 68, 102, 0.2)'};
`
