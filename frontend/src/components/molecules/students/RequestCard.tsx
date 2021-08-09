import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

import RoundImage from 'components/atoms/RoundImage'
import SatisfactionEmoji from 'components/atoms/SatisfactionEmoji'
import Button from 'components/atoms/students/Button'
import CancelRequestModal from 'components/organisms/students/modal_contents/cancel_request'
import getPartner from 'utils/getPartner'
import resolvePath from 'utils/resolvePath'

import * as ConversationModels from 'models/conversation'
import { Link } from 'react-router-dom'

type CardType = 'brief' | 'detail'

interface Props {
  myId: number
  studentsRequestConversation: ConversationModels.RequestConversation
  type: CardType
  setContents(content: JSX.Element): void
  open(): void
}

export default ({
  myId,
  studentsRequestConversation,
  type,
  setContents,
  open
}: Props) => {
  const conversation = studentsRequestConversation.conversation
  const partner = getPartner(conversation, myId)
  const withSelfConversationNum = partner
    ? partner.conversations.filter(
        (partnerConversation: ConversationModels.UserConversation) =>
          partnerConversation.with_self
      ).length
    : 0
  const requestDetailPath = resolvePath.page(
    'students',
    `requests/detail/${studentsRequestConversation.id}`
  )
  const DetailButtons = () => (
    <ButtonContainer>
      <Button
        text="Details"
        type="white"
        width={200}
        height={56}
        fontSize={28}
        link={requestDetailPath}
      />
      <Button
        text="Cancel Request"
        type="red"
        width={275}
        height={56}
        fontSize={28}
        onClick={() => {
          setContents(<CancelRequestModal conversation={conversation} />)
          open()
        }}
      />
    </ButtonContainer>
  )

  const BriefButton = () => (
    <Button
      text="Requesting..."
      type="blue"
      width={300}
      height={56}
      fontSize={28}
    />
  )

  const Content = () =>
    partner ? (
      <>
        <Label>
          {withSelfConversationNum ? `${withSelfConversationNum}x` : 'New'}
        </Label>
        <Time>
          {getConversationDate(
            studentsRequestConversation.start_at,
            studentsRequestConversation.end_at
          )}
        </Time>
        <Info>
          <RoundImage
            src={partner.picture_url}
            size={150}
            badge={partner.highly_reliable ? 'elder' : null}
            code={partner ? partner.country_code : ''}
          />
          <UserData>
            <Name>{partner.name}</Name>
            {type === 'detail' ? (
              <Evaluation>
                <SatisfactionEmoji satisfaction={partner.evaluate} />
              </Evaluation>
            ) : (
              <BriefButton />
            )}
          </UserData>
        </Info>
        {type === 'detail' ? <DetailButtons /> : null}
      </>
    ) : null

  return (
    <Container data-type={type}>
      {type === 'brief' ? (
        <Link to={requestDetailPath}>
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </Container>
  )
}

const getConversationDate = (startDateTime: string, endDateTime: string) => {
  const start = moment.parseZone(startDateTime)
  const end = moment.parseZone(endDateTime)

  return `${start.format('D MMM YYYY hh:mma')} - ${end.format('hh:mma')}`
}

const Container = styled.div`
  position: relative;
  width: 686px;
  padding: 48px;
  box-sizing: border-box;
  margin: 0 auto 24px;
  border-radius: 16px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px 0 rgb(5, 68, 102, 0.35)'};
  overflow: hidden;
  color: #405766;
  text-align: left;
  &[data-type='brief'] {
    height: 314px;
  }
  &[data-type='detail'] {
    height: 406px;
  }
  & > a {
    color: inherit;
  }
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

const Time = styled.div`
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 28px;
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
