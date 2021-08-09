// import Button from 'components/atoms/teachers/Button'
import FlatButton from 'components/atoms/teachers/FlatButton'
// import MypageInfoHead from 'components/molecules/teachers/MypageInfoHead'
import ReservationCard from 'components/molecules/teachers/ReservationCard'
import CancelConversationModal from 'components/organisms/teachers/modal_contents/cancel_conversation'
import withConversations from 'hocs/withConversations'
import * as ConversationModels from 'models/conversation'
import * as TeachersModels from 'models/teachers'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'
import { useState } from 'react'

interface Props {
  authToken: string
  info: TeachersModels.Info
  myId: number
  page: number
  reservations: ConversationModels.ConversationResponse | null
  back(): void
  forward(): void
  openModal(): void
  setModalContents(contents: JSX.Element): void
  getSelectedTag(): void
}

export default withConversations((props: Props) => {
  const {
    // authToken,
    myId,
    page,
    reservations,
    // back,
    // forward,
    openModal,
    setModalContents,
    getSelectedTag
  } = props

  const [loaded, setLoaded] = useState(0)

  if (loaded === 0) {
    setLoaded(1)
    getSelectedTag()
  }

  return (
    <Container>
      {/* <MypageInfoHead
        authToken={authToken}
        reservations={reservations}
        back={back}
        forward={forward}
        page={page}
      /> */}
      <ReservationButton to={resolvePath.page('teachers', 'reservations/new')}>
        <FlatButton
          backgroundColor="#138efd"
          text="予約する"
          width={276}
          height={80}
          color="#fff"
          isSelected={false}
        />
        <ReservationButtonText>
          {'いくつでも予約できます'}
        </ReservationButtonText>
      </ReservationButton>
      <BodyContainer>
        {reservations
          ? reservations.data.map((reservation, index) => {
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
                        page={page}
                        reservationId={reservation.id}
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
            })
          : null}
      </BodyContainer>
      {/* <ButtonContainer>
        <Button
          type="white"
          width={344}
          height={112}
          fontSize={40}
          text="リクエスト一覧"
          link={resolvePath.page('teachers', 'requests')}
        />
        <Button
          type="white"
          width={344}
          height={112}
          fontSize={40}
          text="予約一覧"
          link={resolvePath.page('teachers', 'reservations')}
        />
      </ButtonContainer> */}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   margin-bottom: 36px;
//   display: flex;
//   flex-direction: column;
// `

const BodyContainer = styled.div`
  width: 736px;
  min-height: 670px;
  max-height: 750px;
  margin: 0 auto;
  overflow: scroll;
`

const ReservationButton = styled(Link)`
  appearance: none;
  display: flex;
  align-items: center;
  width: 736px;
  height: 100px;
  box-sizing: border-box;
  margin: 24px;
  padding: 0 10px;
  border-radius: 50px;
  outline: none;
  border: none;
  background-color: #fff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px -10px rgba(5, 68, 102, 0.35)'};
  flex: 0 1 auto;
`

const ReservationButtonText = styled.span`
  margin-left: 32px;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.53;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`
// リクエスト昨日撤廃により廃止
// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   position: absolute;
//   left: 32px;
//   bottom: 12px;
//   width: 736px;
//   margin: 0 auto;
// `
