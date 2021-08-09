import ConversationEnd from 'components/organisms/students/conversation_end'
import withConversationId from 'hocs/withConversationId'
import * as React from 'react'
import styled from 'styled-components'

export default withConversationId(() => {
  return (
    <Container>
      <ConversationEnd />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 0;
  background-image: linear-gradient(331deg, #2eb1ff, #138efd);
`
