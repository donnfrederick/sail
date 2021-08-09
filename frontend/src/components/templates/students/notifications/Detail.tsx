import Footer from 'components/molecules/students/Footer'
import Header from 'components/organisms/students/header'
import NotificationsDetail from 'components/organisms/students/notifications_detail'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <NotificationsDetail />
      <Header text="Notifications" hasBackButton={true} />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 152px 40px;
`
