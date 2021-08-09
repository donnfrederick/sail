import Evaluation from 'components/organisms/students/evaluation'
import withConversationId from 'hocs/withConversationId'
import * as React from 'react'
import styled from 'styled-components'

export default withConversationId(() => {
  return (
    <Container>
      <Evaluation type="completed" />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  .is-pc & {
    height: 1280px;
  }
`
