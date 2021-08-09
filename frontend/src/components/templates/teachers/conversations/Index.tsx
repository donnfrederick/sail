import Conversation from 'components/organisms/teachers/conversation'
import withWSConversationsOpen from 'hocs/withWSConversationsOpen'
import * as React from 'react'
import styled from 'styled-components'

export default withWSConversationsOpen(() => {
  return (
    <Container>
      <Conversation />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`
