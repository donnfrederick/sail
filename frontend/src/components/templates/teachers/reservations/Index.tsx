import Header from 'components/molecules/teachers/Header'
import ReservationIndex from 'components/organisms/teachers/reservations'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <ReservationIndex />
      <Header hasSupport={true} text="予約一覧" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 154px;
  text-align: center;
`
