import Button from 'components/atoms/students/Button'
import ReservedDate from 'components/atoms/students/ReservedDate'
import CompleteReservationModal from 'components/organisms/students/modal_contents/complete_reservation'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import UserProfile from 'components/organisms/students/user_profile'
import { localStorage as localStorageConstants } from 'constants/index'
import withConversations from 'hocs/withConversations'
import * as ConversationModels from 'models/conversation'
import * as CustomUrlSchemeModels from 'models/customUrlScheme'
import moment from 'moment'
import * as qs from 'qs'
import * as React from 'react'
import { postStartConversation } from 'reducers/conversation'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'

type Page = 'new' | 'reserved'

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  myId: number
  page: Page
  recommendedReservation: ConversationModels.Conversation | null
  reservedConversation: ConversationModels.Conversation | null
  openModal(): void
  postRequestConversations(
    authToken: string,
    conversationId: number,
    startAt: string
  ): void
  postReserve(authToken: string, conversationId: number): void
  setModalContents(contents: JSX.Element): void
}

export default withConversations((props: Props) => {
  const {
    authToken,
    conversation,
    myId,
    page,
    recommendedReservation,
    reservedConversation,
    openModal,
    postRequestConversations,
    postReserve,
    setModalContents
  } = props
  const partner =
    page === 'new'
      ? recommendedReservation
        ? getPartner(recommendedReservation, myId)
        : null
      : conversation
        ? getPartner(conversation, myId)
        : null

  const isAcceptingRequests =
    page === 'new' &&
    recommendedReservation &&
    recommendedReservation.accepting_requests

  return (
    <Container>
      <Heading>
        <ReservedDate
          start={
            page === 'new'
              ? recommendedReservation
                ? recommendedReservation.start_at
                : ''
              : conversation
                ? conversation.start_at
                : ''
          }
          end={
            page === 'new'
              ? recommendedReservation
                ? recommendedReservation.end_at
                : ''
              : conversation
                ? conversation.end_at
                : ''
          }
        />
        <ButtonContainer>
          {page === 'new' ? (
            <Button
              text={isAcceptingRequests ? 'Request' : 'Confirm'}
              type="blue"
              isActive={
                recommendedReservation && recommendedReservation.available
                  ? true
                  : false
              }
              width={492}
              height={88}
              fontSize={32}
              onClick={async () => {
                if (
                  recommendedReservation &&
                  recommendedReservation.available
                ) {
                  try {
                    if (isAcceptingRequests) {
                      await postRequestConversations(
                        authToken,
                        recommendedReservation.id,
                        recommendedReservation.start_at
                      )
                      setModalContents(
                        <CompleteReservationModal
                          type="request"
                          reservedConversation={reservedConversation}
                        />
                      )
                    } else {
                      await postReserve(authToken, recommendedReservation.id)
                      setModalContents(
                        <CompleteReservationModal
                          type="anyone"
                          reservedConversation={reservedConversation}
                        />
                      )
                    }
                  } catch (error) {
                    setModalContents(<FailFetchingModal error={error} />)
                  }
                  openModal()
                }
              }}
            />
          ) : (
            <Button
              text="Talk"
              type="green"
              width={492}
              height={88}
              fontSize={32}
              link={
                isWebView()
                  ? ''
                  : conversation
                    ? resolvePath.page(
                        'students',
                        `conversations/${conversation.id}`
                      )
                    : ''
              }
              onClick={() => {
                if (!conversation) {
                  return
                }

                try {
                  if (authToken) {
                    postStartConversation(authToken, conversation.id)
                  }
                } catch (error) {
                  // nothing to do
                }

                if (!isWebView()) {
                  return
                }

                const params: CustomUrlSchemeModels.Conversation = {
                  end_url: `/students/conversations/${conversation.id}/end`,
                  partner_name: partner ? partner.name : '',
                  partner_photo_url: partner ? partner.picture_url : '',
                  redirect_url: `/students/conversations/${
                    conversation.id
                  }/evaluate`,
                  sora_channel_id: conversation.channel_id,
                  user_type: 'Student',
                  ws_token:
                    localStorage.getItem(
                      localStorageConstants.WEB_SOCKET_TOKEN_KEY
                    ) || ''
                }

                window.location.href = `sailapp://call?${qs.stringify(params)}`
              }}
              isActive={conversation ? isStarted(conversation) : false}
            />
          )}
        </ButtonContainer>
        {recommendedReservation &&
        recommendedReservation.available === false ? (
          <Small>
            You have already reserved one. To reserve more, please finish the
            reserved conversations or update your membership.
          </Small>
        ) : null}
      </Heading>
      {partner ? <UserProfile user={partner} type="reservation" /> : null}
    </Container>
  )
})

const isStarted = (conversation: ConversationModels.Conversation) => {
  return (
    moment.parseZone(conversation.start_at).diff(moment()) <= 0 &&
    moment.parseZone(conversation.end_at).diff(moment()) > 0
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 40px;
  color: #405766;
`

const Heading = styled.div`
  padding: 20px 0 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid #9aaab5;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Small = styled.small`
  display: block;
  width: 554px;
  margin: 40px auto 0;
  font-size: 28px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0px;
  text-align: left;
  color: #fa6970;
`
