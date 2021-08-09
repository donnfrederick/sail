import Footer from 'components/molecules/students/Footer'
import Header from 'components/organisms/students/header'
import ReservationsDetail from 'components/organisms/students/reservations_detail'
import withReservationId from 'hocs/withReservationId'
import * as React from 'react'
import styled from 'styled-components'

export default withReservationId(() => {
  return (
    <Container>
      <ReservationsDetail page="reserved" />
      <Header text="Reservation" hasBackButton={true} />
      <Footer />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 88px 0 100px;
`
