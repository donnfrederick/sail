import Header from 'components/molecules/teachers/Header'
import StudentDetail from 'components/organisms/teachers/student_detail'
import withConversationId from 'hocs/withConversationId'
import * as React from 'react'
import styled from 'styled-components'

export default withConversationId(() => {
  return (
    <Container>
      <StudentDetail />
      <Header hasSupport={true} text="会話相手の詳細" backToHome={true} />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 184px;
`
