import RoundImage from 'components/atoms/RoundImage'
import SatisfactionEmoji from 'components/atoms/SatisfactionEmoji'
import Button from 'components/atoms/teachers/Button'
import ApproveStudentRequestModal from 'components/organisms/teachers/modal_contents/approve_student_request'
import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

interface Props {
  requestConversation: ConversationModels.RequestConversationInConversation
  userDetailPath: string
  setContents(content: JSX.Element): void
  open(): void
}

export default ({
  requestConversation,
  userDetailPath,
  setContents,
  open
}: Props) => {
  const partner = requestConversation.user
  const withSelfConversationNum = partner.conversations.filter(
    conversation => conversation.with_self
  ).length
  const conversationTime = `${moment
    .parseZone(requestConversation.start_at)
    .format('HH:mm')} ~ ${moment
    .parseZone(requestConversation.end_at)
    .format('HH:mm')}`
  return partner ? (
    <Container>
      <Label>
        {withSelfConversationNum ? `${withSelfConversationNum}回` : '初'}
      </Label>
      <TimeContainer>
        <TimeLabel>会話予約受付日時</TimeLabel>
        <Time>{conversationTime}</Time>
      </TimeContainer>
      <Info>
        <RoundImage
          src={partner.picture_url}
          size={150}
          badge={partner.grade}
          code={partner ? partner.country_code : ''}
        />
        <UserData>
          <Name>{partner.name}</Name>
          <Evaluation>
            <SatisfactionEmoji satisfaction={partner.evaluate} />
          </Evaluation>
        </UserData>
      </Info>
      <ButtonContainer>
        <Button
          text="詳細を見る"
          type="white"
          width={200}
          height={56}
          fontSize={28}
          link={userDetailPath}
        />
        <Button
          text="この方と会話を予約する"
          type="blue"
          width={360}
          height={56}
          fontSize={28}
          onClick={() => {
            setContents(
              <ApproveStudentRequestModal
                teachersRequestConversation={requestConversation}
              />
            )
            open()
          }}
        />
      </ButtonContainer>
    </Container>
  ) : null
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  margin-bottom: 24px;
  border-radius: 16px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px 0 rgb(5, 68, 102, 0.35)'};
  overflow: hidden;
  color: #405766;
`

const Label = styled.div`
  position: absolute;
  left: -57.5px;
  top: -57.5px;
  height: 115px;
  width: 115px;
  background: #138efd;
  transform: rotate(-45deg);
  transform-origin: center;
  line-height: 185px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
`

const TimeContainer = styled.div`
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 28px;
`

const TimeLabel = styled.div`
  display: inline-block;
  margin-right: 40px;
`

const Time = styled.div`
  display: inline-block;
  color: #138efd;
`

const Info = styled.div`
  display: flex;
  margin-bottom: 36px;
`

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 40px;
`

const Name = styled.p`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
`

const Evaluation = styled.div`
  display: flex;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
