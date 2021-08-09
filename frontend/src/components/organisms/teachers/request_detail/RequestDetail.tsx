import Button from 'components/atoms/teachers/Button'
import RequestCard from 'components/molecules/teachers/RequestCard'
import CancelConversationModal from 'components/organisms/teachers/modal_contents/cancel_conversation'
import withConversationId from 'hocs/withConversationId'
import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import { getDays } from 'utils/calendar'
import resolvePath from 'utils/resolvePath'

interface Props {
  conversation: ConversationModels.Conversation | null
  setContents(content: JSX.Element): void
  open(): void
}

export default withConversationId(
  ({ conversation, setContents, open }: Props) => {
    if (!conversation) {
      return null
    }
    return conversation.conversation_requests ? (
      <Container>
        <ControlHeaderContainer>
          <TimeContainer>
            <Label>会話予約受付日時</Label>
            <Time>
              {getConversationDate(conversation.start_at, conversation.end_at)}
            </Time>
          </TimeContainer>
          <Button
            text="予約を取り消す"
            type="blue"
            width={263}
            height={80}
            fontSize={28}
            marginBottom={12}
            onClick={() => {
              setContents(
                <CancelConversationModal reservationId={conversation.id} />
              )
              open()
            }}
          />
        </ControlHeaderContainer>
        <SubContailer>
          {conversation.conversation_requests.map(
            (
              conversationRequest: ConversationModels.RequestConversationInConversation
            ) => {
              const userDetailPath = resolvePath.page(
                'teachers',
                `requests/detail/${conversation.id}/users/${
                  conversationRequest.user.id
                }`
              )
              return (
                <RequestCard
                  key={conversationRequest.id}
                  requestConversation={conversationRequest}
                  userDetailPath={userDetailPath}
                  setContents={setContents}
                  open={open}
                />
              )
            }
          )}
        </SubContailer>
      </Container>
    ) : null
  }
)

const getConversationDate = (startDateTime: string, endDateTime: string) => {
  const start = moment.parseZone(startDateTime)
  const end = moment.parseZone(endDateTime)

  return `${start.format(
    `M/D (${getDays('ja')[start.day()]}) H:mm`
  )} - ${end.format('H:mm')}`
}

const Container = styled.div``

const SubContailer = styled.div`
  width: 686px;
  margin: 0 auto;
`

const ControlHeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-bottom: 48px;
  padding-left: 24px;
  padding-right: 24px;
`

const TimeContainer = styled.div`
  font-size: 36px;
  font-weight: bold;
`

const Label = styled.div`
  color: #405766;
  line-height: 2;
`

const Time = styled.div`
  color: #138efd;
  line-height: 2;
`
