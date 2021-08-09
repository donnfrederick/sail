import ConversationEnd from 'components/organisms/teachers/conversation_end'
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
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`
