import Button from 'components/atoms/students/Button'
import ReservedDate from 'components/atoms/students/ReservedDate'
import CancelRequestModal from 'components/organisms/students/modal_contents/cancel_request'
import UserProfile from 'components/organisms/students/user_profile'
import withStudentsRequestConversationId from 'hocs/withStudentsRequestConversationId'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'

interface Props {
  studentsRequestConversation: ConversationModels.RequestConversation | null
  myId: number
  open(): void
  setContents(conent: JSX.Element): void
}

export default withStudentsRequestConversationId(
  ({ studentsRequestConversation, myId, open, setContents }: Props) => {
    if (!studentsRequestConversation) {
      return null
    }
    const conversation = studentsRequestConversation.conversation
    const partner = conversation ? getPartner(conversation, myId) : null
    return partner ? (
      <Container>
        <TopContainer>
          <ReservedDate
            end={studentsRequestConversation.end_at}
            start={studentsRequestConversation.start_at}
          />
          <Button
            text="Cancel"
            type="red"
            width={300}
            height={70}
            fontSize={32}
            onClick={() => {
              setContents(<CancelRequestModal conversation={conversation} />)
              open()
            }}
          />
        </TopContainer>
        <UserProfile user={partner} type="reservation" />
      </Container>
    ) : null
  }
)

const Container = styled.div`
  padding: 40px;
`

const TopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  border-bottom: 1px solid #9aaab5;
`
