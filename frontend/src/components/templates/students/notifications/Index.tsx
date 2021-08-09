import Footer from 'components/molecules/students/Footer'
import Header from 'components/organisms/students/header'
import NotificationsSummary from 'components/organisms/students/notifications_summary'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <NotificationsSummary />
      <Header text="Notifications" />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 120px 32px 156px;
`
