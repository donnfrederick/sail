import Header from 'components/molecules/teachers/Header'
import ReservationNew from 'components/organisms/teachers/reservations_new'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <ReservationNew />
      <Header hasSupport={true} text="予約" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 154px;
  text-align: center;
`
