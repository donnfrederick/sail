import * as React from 'react'
import styled from 'styled-components'

import ConversationHistoryDetail from 'components/organisms/students/conversation_history_detail'
import Header from 'components/organisms/students/header'

export default () => (
  <Container>
    <Header hasBackButton={true} text="Profile" />
    <ConversationHistoryDetail />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  padding-top: 108px;
`
