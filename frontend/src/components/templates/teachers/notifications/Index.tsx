import Header from 'components/molecules/teachers/Header'
import NotificationsSummary from 'components/organisms/teachers/notifications_summary'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <NotificationsSummary />
      <Header hasSupport={true} text="お知らせ" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 160px 0 224px;
  text-align: center;
`
