import * as React from 'react'
import styled from 'styled-components'

import Header from 'components/molecules/teachers/Header.tsx'
import ConversationHistoryDetail from 'components/organisms/teachers/conversation_history_detail'

export default () => (
  <Container>
    <Header backToHome={true} hasSupport={true} text="会話相手プロフィール" />
    <ConversationHistoryDetail />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  padding-top: 160px;
`
