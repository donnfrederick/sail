import RoundImage from 'components/atoms/RoundImage'
import FlatButton from 'components/atoms/teachers/FlatButton'
import { localStorage as localStorageConstants } from 'constants/index'
import * as ConversationModels from 'models/conversation'
import * as CustomUrlSchemeModels from 'models/customUrlScheme'
import moment from 'moment'
import * as qs from 'qs'
import * as React from 'react'
import { postStartConversation } from 'reducers/conversation'
import styled from 'styled-components'
import { getDays } from 'utils/calendar'
import getAuthToken from 'utils/getAuthToken'
import isHuawei from 'utils/isHuawei'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'

type Status = 'queued' | 'no-reserved' | 'waiting' | 'requests'

interface Props {
  index?: number
  myId?: number
  reservation?: ConversationModels.Conversation
  status: Status
  deleteConversation?: () => void
}

export default (props: Props) => {
  const { myId, reservation, status, deleteConversation } = props

  const partner =
    myId && reservation
      ? reservation.users.filter(user => user.id !== myId)[0]
      : null
  const authToken = getAuthToken()

  const pictureUrl = partner
    ? partner.picture_url
    : reservation &&
      reservation.status === 'waiting' &&
      reservation.accepting_requests &&
      reservation.conversation_requests.length
      ? reservation.conversation_requests[0].user.picture_url
      : resolvePath.image('common/user@3x.png')

  return (
    <Container data-status={status}>
      <RoundImage
        src={pictureUrl}
        size={150}
        withBorder={partner ? true : false}
        badge={partner ? partner.grade : null}
        code={partner ? partner.country_code : ''}
      />
      {status === 'queued' && reservation ? (
        <RightSide>
          <ReservedDate>
            {getConversationDate(reservation.start_at, reservation.end_at)}
          </ReservedDate>
          <Name>{partner ? `${partner.name} さん` : null}</Name>
          <ButtonContainer>
            <FlatButton
              text="詳細を見る"
              isSelected={false}
              width={224}
              height={56}
              backgroundColor="#ffffff"
              color="#1e9dfd"
              fontSize={32}
              link={resolvePath.page(
                'teachers',
                `reservations/detail/${reservation.id}`
              )}
            />
            <FlatButton
              text="会話する"
              isSelected={false}
              isDisabled={isNotStarted(reservation)}
              width={224}
              height={56}
              backgroundColor="#ffffff"
              color="#1e9dfd"
              fontSize={32}
              link={
                isWebView()
                  ? ''
                  : resolvePath.page(
                      'teachers',
                      `conversations/${reservation.id}`
                    )
              }
              onClick={() => {
                try {
                  if (authToken) {
                    postStartConversation(authToken, reservation.id)
                  }
                } catch (error) {
                  // nothing to do
                }

                if (!isWebView()) {
                  return
                }

                const params: CustomUrlSchemeModels.Conversation = {
                  end_url: `/teachers/conversations/${reservation.id}/end`,
                  partner_name: partner ? partner.name : '',
                  partner_photo_url: partner ? partner.picture_url : '',
                  redirect_url: `/teachers/conversations/${
                    reservation.id
                  }/evaluate`,
                  sora_channel_id: reservation.channel_id,
                  user_type: 'Teacher',
                  ws_token:
                    localStorage.getItem(
                      localStorageConstants.WEB_SOCKET_TOKEN_KEY
                    ) || ''
                }

                window.location.href = `sailapp://call?${qs.stringify(params)}`
              }}
            />
          </ButtonContainer>
        </RightSide>
      ) : status === 'waiting' && reservation ? (
        <RightSide>
          <ReservedDate>
            {getConversationDate(reservation.start_at, reservation.end_at)}
          </ReservedDate>
          <Name>会話相手を探しています</Name>
          <FlatButton
            text="予約を取り消す"
            isSelected={false}
            width={470}
            height={56}
            backgroundColor="#ffffff"
            color="#fec865"
            fontSize={32}
            onClick={deleteConversation}
          />
        </RightSide>
      ) : status === 'no-reserved' ? (
        <RightSide>
          <NoReserved>海外の学生と交流しましょう</NoReserved>
          <FlatButton
            text="予約する"
            isSelected={false}
            width={362}
            height={82}
            backgroundColor="#ffffff"
            color="#8ebbde"
            fontSize={40}
            link={resolvePath.page('teachers', 'reservations/new')}
          />
        </RightSide>
      ) : status === 'requests' && reservation ? (
        <RightSide>
          <RequestDate>
            {getConversationDate(reservation.start_at, reservation.end_at)}
          </RequestDate>
          <FlatButton
            text={`${
              reservation.conversation_requests.length
            }人からリクエストが来ています`}
            isSelected={false}
            width={460}
            height={52}
            backgroundColor="#138efd"
            color="#fff"
            fontSize={28}
            link={resolvePath.page(
              'teachers',
              `requests/detail/${reservation.id}`
            )}
          />
        </RightSide>
      ) : null}
    </Container>
  )
}

const getConversationDate = (startDateTime: string, endDateTime: string) => {
  const start = moment.parseZone(startDateTime)
  const end = moment.parseZone(endDateTime)

  return `${start.format(
    `M/D (${getDays('ja')[start.day()]}) H:mm`
  )} - ${end.format('H:mm')}`
}

const isStarted = (conversation: ConversationModels.Conversation) => {
  return (
    moment.parseZone(conversation.start_at).diff(moment()) <= 0 &&
    moment.parseZone(conversation.end_at).diff(moment()) > 0
  )
}

const isNotStarted = (conversation: ConversationModels.Conversation) => {
  return !isStarted(conversation)
}

// const textColors = ['#1e9dfd', '#2ac1fd', '#2dd4e9']

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 736px;
  height: 210px;
  border-radius: 16px;
  margin: 0 auto 24px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 20px 0 rgba(5, 68, 102, 0.3)'};

  &[data-status='queued'] {
    background-image: linear-gradient(286deg, #2eb1ff, #138efd);
  }
  &[data-status='waiting'] {
    background-image: linear-gradient(106deg, #fcc76d, #fec864);
  }
  &[data-status='no-reserved'] {
    background-image: linear-gradient(106deg, #9dc1f2, #9bd2f2);
  }
  &[data-status='requests'] {
    background-color: #fff;
    background-image: none;
  }
`

const RightSide = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 470px;
  height: 100%;
  margin-left: 46px;
`

const ReservedDate = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: left;
  color: #ffffff;
`

const RequestDate = styled(ReservedDate)`
  margin-bottom: 40px;
  color: #405766;
`

const Name = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 1.3;
  text-align: left;
  color: #ffffff;
`

const NoReserved = styled.div`
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
