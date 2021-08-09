import Button from 'components/atoms/teachers/Button'
import CancelConversationModal from 'components/organisms/teachers/modal_contents/cancel_conversation'
import UserProfile from 'components/organisms/teachers/user_profile'
import { localStorage as localStorageConstants } from 'constants/index'
import * as ConversationModels from 'models/conversation'
import * as CustomUrlSchemeModels from 'models/customUrlScheme'
import moment from 'moment'
import * as qs from 'qs'
import * as React from 'react'
import { postStartConversation } from 'reducers/conversation'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'
import getPartner from 'utils/getPartner'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'

interface Props {
  conversation: ConversationModels.Conversation | null
  myId: number
  open(): void
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const { conversation, myId, open, setContents } = props

  moment.locale('ja')

  const partner = conversation ? getPartner(conversation, myId) : null
  const authToken = getAuthToken()

  const isConversationStarted = conversation
    ? moment(conversation.start_at).valueOf() < Date.now()
    : false
  const isConversationEnded = conversation
    ? moment(conversation.end_at).valueOf() < Date.now()
    : false

  const onTalkLink = isWebView()
    ? ''
    : conversation
      ? resolvePath.page('teachers', `conversations/${conversation.id}`)
      : ''

  const onTalkClick = () => {
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
      end_url: `/teachers/conversations/${conversation.id}/end`,
      partner_name: partner ? partner.name : '',
      partner_photo_url: partner ? partner.picture_url : '',
      redirect_url: `/teachers/conversations/${conversation.id}/evaluate`,
      sora_channel_id: conversation.channel_id,
      user_type: 'Teacher',
      ws_token:
        localStorage.getItem(localStorageConstants.WEB_SOCKET_TOKEN_KEY) || ''
    }

    window.location.href = `sailapp://call?${qs.stringify(params)}`
  }

  const SecondaryButton = () =>
    conversation ? (
      isConversationEnded ? null : isConversationStarted ? (
        <Button
          type="green"
          text="会話する"
          width={344}
          height={112}
          fontSize={40}
          link={onTalkLink}
          onClick={onTalkClick}
        />
      ) : (
        <Button
          type="blue"
          text="予約を取り消す"
          width={344}
          height={112}
          fontSize={40}
          onClick={() => {
            setContents(
              <CancelConversationModal reservationId={conversation.id} />
            )
            open()
          }}
        />
      )
    ) : null

  return conversation && partner ? (
    <Container>
      <Heading>
        <Reservation>
          <ReservedDate>{`${moment
            .parseZone(conversation.start_at)
            .format('YYYY年M月D日(dd)')}`}</ReservedDate>
          <ReservedTime>{`${moment
            .parseZone(conversation.start_at)
            .format('HH:mm')} - ${moment
            .parseZone(conversation.end_at)
            .format('HH:mm')}`}</ReservedTime>
        </Reservation>
        <ButtonContainer data-center={isConversationEnded}>
          <Button
            type="white"
            text="戻る"
            width={344}
            height={112}
            fontSize={40}
            link={resolvePath.page('teachers', 'mypage')}
          />
          <SecondaryButton />
        </ButtonContainer>
      </Heading>
      {partner ? (
        <UserProfile type="reservation" user={partner} myId={myId} />
      ) : null}
    </Container>
  ) : null
}

const Container = styled.div`
  width: 100%;
  color: #405766;
`

const Heading = styled.div`
  padding-bottom: 56px;
  margin: 0 40px 56px;
  border-bottom: 1px solid #405766;
`

const Reservation = styled.div`
  text-align: center;
  margin-bottom: 56px;
`

const ReservedDate = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 1.69;
  letter-spacing: 0px;
  color: #405766;
`

const ReservedTime = styled.div`
  font-size: 48px;
  font-weight: 500;
  line-height: 1.13;
  letter-spacing: 0px;
  color: #405766;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 720px;
  &[data-center='true'] {
    justify-content: center;
  }
  &[data-center='false'] {
    justify-content: space-between;
  }
`
