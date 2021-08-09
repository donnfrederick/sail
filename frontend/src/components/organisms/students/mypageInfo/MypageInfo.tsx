// import MypageInfoHead from 'components/molecules/students/MypageInfoHead'
import RequestCard from 'components/molecules/students/RequestCard'
import ReservationCard from 'components/molecules/students/ReservationCard'
import withConversations from 'hocs/withConversations'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  myId: number
  page: number
  studentsRequestConversations: ConversationModels.RequestConversationResponse | null
  reservations: ConversationModels.ConversationResponse | null
  back(): void
  forward(): void
  open(): void
  setContents(content: JSX.Element): void
}

export default withConversations((props: Props) => {
  const {
    // authToken,
    myId,
    // page,
    studentsRequestConversations,
    reservations,
    // back,
    // forward,
    open,
    setContents
  } = props

  return (
    <Container>
      {/* <input type="datetime-local" className="form-control" /> */}
      {/* <MypageInfoHead
        authToken={authToken}
        reservations={reservations}
        back={back}
        forward={forward}
        page={page}
      /> */}
      <BodyContainer>
        {reservations
          ? reservations.data.map((reservation, index) => {
              if (reservation.accepting_requests) {
                if (!studentsRequestConversations) {
                  return null
                }
                const studentsRequestConversation = studentsRequestConversations.data.find(
                  (
                    requestConversation: ConversationModels.RequestConversation
                  ) => requestConversation.conversation.id === reservation.id
                )
                return studentsRequestConversation ? (
                  <RequestCard
                    key={reservation.id}
                    myId={myId}
                    studentsRequestConversation={studentsRequestConversation}
                    type="brief"
                    setContents={setContents}
                    open={open}
                  />
                ) : null
              } else {
                return (
                  <ReservationCard
                    key={reservation.id}
                    myId={myId}
                    reservation={reservation}
                    status="queued"
                    to="conversations"
                  />
                )
              }
            })
          : null}
        {reservations && limit - reservations.data.length > 0
          ? [...Array(limit - reservations.data.length)].map(
              (element, index) => (
                <ReservationCard
                  key={index}
                  status="empty"
                  to="conversations"
                />
              )
            )
          : null}
      </BodyContainer>
    </Container>
  )
})

const limit = 3

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`

const BodyContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  overflow: scroll;
`
