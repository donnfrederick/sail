import Button from 'components/atoms/students/Button'
import UserProfile from 'components/organisms/students/user_profile'
import withNotificationsId from 'hocs/withNotificationsId'
import * as ConversationModels from 'models/conversation'
import * as NotificationModels from 'models/notification'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'
import resolvePath from 'utils/resolvePath'

interface Props {
  cancelledConversation: ConversationModels.CancelledConversation | null
  conversation: ConversationModels.Conversation | null
  myId: number
  notification: NotificationModels.Notification
}

export default withNotificationsId((props: Props) => {
  const { cancelledConversation, conversation, myId, notification } = props

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

  const notificationText = NotificationModels.notificationText.student
  const additionalNotification =
    notificationText[notification.notification_type]

  const Buttons = () => {
    const CancelReservationButton = () =>
      conversation ? (
        <Button
          type="blue"
          text="Details"
          width={300}
          height={112}
          fontSize={36}
          link={resolvePath.page(
            'students',
            `conversations/detail/${conversation.id}`
          )}
        />
      ) : null

    const NewReservationButton = () => (
      <Button
        type="blue"
        text="Reserve"
        width={300}
        height={112}
        fontSize={36}
        link={resolvePath.page('students', 'reservations/new')}
      />
    )

    const ActionButton = () =>
      notification.notification_type ===
      NotificationModels.NotificationTypes.cancellation ? (
        <NewReservationButton />
      ) : (
        <CancelReservationButton />
      )

    return (
      <ButtonContainer>
        <ActionButton />
      </ButtonContainer>
    )
  }

  return (
    <Container>
      <NotificationContent>
        <TimeStamp>
          {moment.parseZone(notification.notificated_at).format('MMMM D, YYYY')}
        </TimeStamp>
        <Title>{notification.title}</Title>
        <Text>{notification.body}</Text>
      </NotificationContent>
      {partner ? <UserProfile user={partner} type="basic" /> : null}
      <AdditionalInfo>
        {additionalNotification ? (
          <AdditionalText>{additionalNotification}</AdditionalText>
        ) : null}
        {isCancelledConversation ? (
          <CancellationText>
            {notificationText.cancelledConversation}
          </CancellationText>
        ) : null}
      </AdditionalInfo>
      <Buttons />
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`

const NotificationContent = styled.div`
  text-align: left;
  margin-bottom: 50px;
`

const TimeStamp = styled.time`
  display: block;
  margin-bottom: 32px;
  font-size: 28px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.5px;
  color: #90aec1;
`

const Title = styled.h2`
  margin-bottom: 36px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0.5px;
  color: #405766;
`

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.5;
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
  margin: 40px 0 72px;
`

const AdditionalText = styled(Text)`
  margin-bottom: 72px;
`

const CancellationText = styled(Text)`
  color: red;
`
