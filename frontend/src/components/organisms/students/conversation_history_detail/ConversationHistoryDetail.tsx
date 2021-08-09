import UserProfile from 'components/organisms/students/user_profile'
import withConversationId from 'hocs/withConversationId'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'

interface Props {
  conversation: ConversationModels.Conversation | null
  myId: number
}

export default withConversationId(({ conversation, myId }: Props) => {
  const partner = conversation ? getPartner(conversation, myId) : null
  return partner ? (
    <Container>
      <UserProfile user={partner} myId={myId} type="complete" />
    </Container>
  ) : null
})

const Container = styled.div`
  padding: 40px;
`
