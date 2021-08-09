import ReservationCard from 'components/molecules/teachers/ReservationCard'
import withTeachersRequestConversations from 'hocs/withTeachersRequestConversations'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  myId: number
  teachersRequestConversations: ConversationModels.Conversation[] | null
}

export default withTeachersRequestConversations(
  ({ myId, teachersRequestConversations }: Props) => {
    if (!teachersRequestConversations) {
      return null
    }
    return (
      <Container>
        {teachersRequestConversations.map(
          (reservation: ConversationModels.Conversation) => (
            <ReservationCard
              key={reservation.id}
              status="requests"
              myId={myId}
              reservation={reservation}
            />
          )
        )}
      </Container>
    )
  }
)

const Container = styled.div`
  margin: 0 auto;
`
