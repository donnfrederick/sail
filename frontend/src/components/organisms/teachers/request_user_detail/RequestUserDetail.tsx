import Button from 'components/atoms/teachers/Button'
import { history } from 'components/organisms/Router'
import ApproveStudentRequestModal from 'components/organisms/teachers/modal_contents/approve_student_request'
import UserProfile from 'components/organisms/teachers/user_profile'
import withTeachersRequestConversationId from 'hocs/withTeachersRequestConversationId'
import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  teachersRequestConversation: ConversationModels.RequestConversationInConversation | null
  open(): void
  setContents(content: JSX.Element): void
}

export default withTeachersRequestConversationId(
  ({ teachersRequestConversation, open, setContents }: Props) => {
    if (!teachersRequestConversation) {
      return null
    }
    const partner = teachersRequestConversation.user

    return partner ? (
      <Container>
        <Heading>
          <Reservation>
            <ReservedDate>{`${moment
              .parseZone(teachersRequestConversation.start_at)
              .format('YYYY年M月D日(dd)')}`}</ReservedDate>
            <ReservedTime>{`${moment
              .parseZone(teachersRequestConversation.start_at)
              .format('HH:mm')} - ${moment
              .parseZone(teachersRequestConversation.end_at)
              .format('HH:mm')}`}</ReservedTime>
          </Reservation>
          <ButtonContainer>
            <Button
              type="white"
              text="戻る"
              width={200}
              height={70}
              fontSize={32}
              onClick={() => history.goBack()}
            />
            <Button
              type="blue"
              text="この方と会話を予約する"
              width={500}
              height={70}
              fontSize={32}
              onClick={() => {
                setContents(
                  <ApproveStudentRequestModal
                    teachersRequestConversation={teachersRequestConversation}
                  />
                )
                open()
              }}
            />
          </ButtonContainer>
        </Heading>
        <UserProfile user={partner} type="reservation" />
      </Container>
    ) : null
  }
)

const Container = styled.div`
  padding: 40px 0;
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
  justify-content: space-between;
  width: 720px;
`
