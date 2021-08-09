import ChooseDate from 'components/atoms/students/ChooseDate'
import Calendar from 'components/molecules/students/Calendar'
// import DatePicker from 'components/molecules/students/Datepicker'
import ReservationCard from 'components/molecules/students/ReservationCard'
import withInitMonthAndDateSelection from 'hocs/withInitMonthAndDateSelection'
import * as ConversationModels from 'models/conversation'
import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  calendar: ConversationModels.Calendar
  myId: number
  recommendedReservations: ConversationModels.Conversation[]
  selectedDate: string
  selectedMonth: number
  selectedYear: number
  changeMonth(month: number): void
  changeYear(year: number): void
  getCalendar(authToken: string, year: number, month: number): void
  getRecommend(authToken: string, date: string): void
  getRecommendNew(
    authToken: string,
    date: string,
    syspcurrentppage: number
  ): void
  resetRecommendedReservations(): void
  selectDate(date: string): void
  postConversations(
    authToken: string,
    request: ConversationModels.Request
  ): void
}

export default withInitMonthAndDateSelection((props: Props) => {
  const {
    authToken,
    calendar,
    myId,
    recommendedReservations,
    selectedMonth,
    selectedYear,
    selectedDate,
    changeYear,
    changeMonth,
    getCalendar,
    getRecommend,
    getRecommendNew,
    resetRecommendedReservations,
    selectDate
  } = props

  const load = 20
  const per_load = Number(load)

  const [sysppage, setsysppage] = useState(20)
  const syspcurrentppage = Number(sysppage)

  const [now_selected_date, set_now_selected_date] = useState('')

  if (selectedDate !== now_selected_date) {
    set_now_selected_date(selectedDate)
    setsysppage(20)
  }

  return (
    <Container>
      {/* <DatePicker authToken={authToken} getRecommend={getRecommend} /> */}
      <Calendar
        authToken={authToken}
        calendar={calendar}
        year={selectedYear}
        month={selectedMonth}
        selectedDate={selectedDate}
        selectDate={selectDate}
        changeYear={changeYear}
        changeMonth={changeMonth}
        getCalendar={getCalendar}
        getRecommend={getRecommend}
        resetRecommendedReservations={resetRecommendedReservations}
      />
      {recommendedReservations.map(reservation => (
        <ReservationCard
          key={reservation.id}
          status={reservation.accepting_requests ? 'request' : 'waiting'}
          reservation={reservation}
          myId={myId}
          to="reservations"
        />
      ))}
      {recommendedReservations.length <= 0 ? <ChooseDate /> : null}
      {recommendedReservations.length == syspcurrentppage ? (
        <ReadMore
          onClick={(event: any) => {
            const load_more = syspcurrentppage + per_load
            setsysppage(load_more)
            getRecommendNew(authToken, selectedDate, load_more)
          }}
        >
          Read More
        </ReadMore>
      ) : null}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
`

const ReadMore = styled.button`
  width: 90%;
  padding: 2rem;
  font-size: 230%;
  background: #33ddff;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`

// const Picker = styled.div`
//   align-items: right;
//   font-size: 28px;
//   margin: 10px;
// `
