import ReservationCard from 'components/molecules/teachers/ReservationCard'
import CancelConversationModal from 'components/organisms/teachers/modal_contents/cancel_conversation'
import withConversations from 'hocs/withConversations'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  myId: number
  reservations: ConversationModels.ConversationResponse | null
  openModal(): void
  setModalContents(content: JSX.Element): void
}

export default withConversations((props: Props) => {
  const { myId, reservations, openModal, setModalContents } = props
  if (!reservations) {
    return null
  }
  return reservations ? (
    <Container>
      {reservations.data.map(
        (reservation: ConversationModels.Conversation, index: number) => {
          return reservation.status === 'queued' ||
            reservation.status === 'progress' ? (
            <ReservationCard
              key={reservation.id}
              index={index}
              status="queued"
              reservation={reservation}
              myId={myId}
            />
          ) : reservation.status === 'waiting' &&
          !reservation.accepting_requests ? (
            <ReservationCard
              key={reservation.id}
              index={index}
              status="waiting"
              reservation={reservation}
              myId={myId}
              deleteConversation={() => {
                setModalContents(
                  <CancelConversationModal
                    reservationId={reservation.id}
                    loadAll={true}
                  />
                )
                openModal()
              }}
            />
          ) : reservation.status === 'waiting' &&
          reservation.accepting_requests ? (
            <ReservationCard
              key={reservation.id}
              index={index}
              status="requests"
              reservation={reservation}
              myId={myId}
            />
          ) : null
        }
      )}
    </Container>
  ) : null
})

const Container = styled.div`
  width: 100%;
`
