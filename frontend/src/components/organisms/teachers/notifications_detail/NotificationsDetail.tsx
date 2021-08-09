import Button from 'components/atoms/teachers/Button'
import UserProfile from 'components/organisms/teachers/user_profile'
import withNotificationsId from 'hocs/withNotificationsId'
import * as ConversationModels from 'models/conversation'
import * as NotificationModels from 'models/notification'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'
import resolvePath from 'utils/resolvePath'

interface Props {
  notification: NotificationModels.Notification
  cancelledConversation: ConversationModels.CancelledConversation | null
  conversation: ConversationModels.Conversation | null
  myId: number
}

export default withNotificationsId((props: Props) => {
  const { notification, cancelledConversation, conversation, myId } = props

  const cancelledConversationExists =
    cancelledConversation && Object.values(cancelledConversation).length

  const isCancelledConversation =
    !conversation && cancelledConversationExists ? true : false
  const relatedConversation = isCancelledConversation
    ? cancelledConversation
    : conversation

  const partner = relatedConversation
    ? getPartner(relatedConversation, myId)
    : null

  const notificationText = NotificationModels.notificationText.teacher
  const additionalNotification =
    notificationText[notification.notification_type]

  const Buttons = () => {
    const CancelReservationButton = () =>
      conversation ? (
        <Button
          type="blue"
          text="詳細"
          width={300}
          height={112}
          fontSize={36}
          link={resolvePath.page(
            'teachers',
            `reservations/detail/${conversation.id}`
          )}
        />
      ) : null

    const NewReservationButton = () => (
      <Button
        type="blue"
        text="予約する"
        width={300}
        height={112}
        fontSize={36}
        link={resolvePath.page('teachers', 'reservations/new')}
      />
    )

    const SecondaryButton = () =>
      notification.notification_type ===
      NotificationModels.NotificationTypes.cancellation ? (
        <NewReservationButton />
      ) : (
        <CancelReservationButton />
      )

    return (
      <ButtonContainer>
        <Button
          type="white"
          text="戻る"
          width={300}
          height={112}
          fontSize={36}
          link={resolvePath.page('teachers', 'notifications')}
        />
        <SecondaryButton />
      </ButtonContainer>
    )
  }

  return (
    <>
      <NotificationContent>
        <TimeStamp>
          {moment
            .parseZone(notification.notificated_at)
            .format('YYYY/MM/DD HH:mm')}
        </TimeStamp>
        <Title>{notification.title}</Title>
        <Text>{notification.body}</Text>
      </NotificationContent>
      {partner ? <UserProfile user={partner} type="basic" /> : null}
      <AdditionalInfo>
        {additionalNotification ? <Text>{additionalNotification}</Text> : null}
        {isCancelledConversation ? (
          <CancellationText>
            {notificationText.cancelledConversation}
          </CancellationText>
        ) : null}
      </AdditionalInfo>
      <Buttons />
    </>
  )
})

const NotificationContent = styled.div`
  width: 640px;
  margin: 0 auto;
  text-align: left;
`

const TimeStamp = styled.time`
  display: block;
  margin-bottom: 48px;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #90aec1;
`

const Title = styled.h2`
  margin: 0 0 48px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0px;
  color: #405766;
`

const Text = styled.p`
  margin: 0 0 72px;
  padding: 0;
  font-size: 36px;
  font-weight: 500;
  line-height: 1.61;
  letter-spacing: 0px;
  white-space: pre-wrap;
  color: #405766;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 56px;
`

const AdditionalInfo = styled.div`
  margin: 40px 40px 72px;
`

const CancellationText = styled(Text)`
  color: red;
`
