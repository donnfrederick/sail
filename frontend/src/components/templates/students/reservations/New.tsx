import Header from 'components/organisms/students/header'
import ReservationsNew from 'components/organisms/students/reservations_new'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <ReservationsNew />
      <Header text="Reservation" hasCancel={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 88px 0 100px;
  text-align: center;
`
