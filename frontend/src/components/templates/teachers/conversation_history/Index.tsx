import * as React from 'react'
import styled from 'styled-components'

import Header from 'components/molecules/teachers/Header.tsx'
import ConversationHistory from 'components/organisms/teachers/conversation_history'

export default () => (
  <Container>
    <Header backToHome={true} hasSupport={true} text="会話履歴" />
    <ConversationHistory />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  padding: 160px 0 192px;
  box-sizing: border-box;
`
