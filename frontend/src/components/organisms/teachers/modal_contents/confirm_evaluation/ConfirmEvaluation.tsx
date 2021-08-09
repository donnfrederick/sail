import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import Stars from 'components/molecules/Stars'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import ThankyouModal from 'components/organisms/teachers/modal_contents/thankyou'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'

interface Props {
  conversation: ConversationModels.Conversation | null
  score: number
  myId: number
  close(): void
  postEvaluation(): void
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    close,
    conversation,
    score,
    myId,
    postEvaluation,
    setContents
  } = props

  const partner = conversation ? getPartner(conversation, myId) : null

  return (
    <Container>
      <ModalTextContainer heading={'この評価でよろしいですか？'} />
      <RoundImage
        src={partner ? partner.picture_url : ''}
        size={200}
        marginBottom={24}
        code={partner ? partner.country_code : ''}
      />
      <Name>{partner ? partner.name : ''}</Name>
      <Stars score={score} size={50} marginBottom={96} />
      <ButtonContainer>
        <Button
          type="white"
          text="やり直す"
          width={272}
          height={112}
          fontSize={40}
          onClick={() => close()}
        />
        <Button
          type="blue"
          text="決定"
          width={272}
          height={112}
          fontSize={40}
          onClick={async () => {
            await postEvaluation()
            setContents(<ThankyouModal />)
          }}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Name = styled.div`
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;

  &::after {
    margin-left: 8px;
    font-size: 32px;
    content: 'さん';
  }
`
