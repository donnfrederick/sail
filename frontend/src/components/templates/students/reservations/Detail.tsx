import Header from 'components/organisms/students/header'
import ReservationsDetail from 'components/organisms/students/reservations_detail'
import withRecommendId from 'hocs/withRecommendId'
import * as React from 'react'
import styled from 'styled-components'

export default withRecommendId(() => {
  return (
    <Container>
      <ReservationsDetail page="new" />
      <Header text="Reservation" hasBackButton={true} hasCancel={true} />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 88px 0 100px;
`
