import RequestCard from 'components/molecules/students/RequestCard'
import withStudentsRequestConversations from 'hocs/withStudentsRequestConversations'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  myId: number
  studentsRequestConversations: ConversationModels.RequestConversationResponse | null
  setContents(content: JSX.Element): void
  open(): void
}

export default withStudentsRequestConversations(
  ({ myId, studentsRequestConversations, setContents, open }: Props) => {
    if (!studentsRequestConversations) {
      return null
    }
    return (
      <Container>
        {studentsRequestConversations.data.map(
          (
            studentsRequestConversation: ConversationModels.RequestConversation
          ) => (
            <RequestCard
              key={studentsRequestConversation.id}
              myId={myId}
              studentsRequestConversation={studentsRequestConversation}
              type="detail"
              setContents={setContents}
              open={open}
            />
          )
        )}
      </Container>
    )
  }
)

const Container = styled.div`
  width: 686px;
  margin: 20px auto;
`
