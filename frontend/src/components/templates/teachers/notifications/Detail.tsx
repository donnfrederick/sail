import Header from 'components/molecules/teachers/Header'
import NotificationsDetail from 'components/organisms/teachers/notifications_detail'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <NotificationsDetail />
      <Header hasSupport={true} text="運営からのお知らせ" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 184px 0 56px;
  text-align: center;
`
