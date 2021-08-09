import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
// import Stars from 'components/molecules/Stars'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'
import resolvePath from 'utils/resolvePath'

interface Props {
  conversation: ConversationModels.Conversation
  myId: number
  path: string
  close(): void
}

export default (props: Props) => {
  const { conversation, myId, path, close } = props

  const partner = getPartner(conversation, myId)

  return (
    <Container>
      <ModalTextContainer
        heading={'会話相手が見つかりました'}
        text={'詳細を確認してみましょう'}
      />
      <RoundImage
        src={partner ? partner.picture_url : ''}
        size={200}
        marginBottom={24}
        code={partner ? partner.country_code : ''}
      />
      <Name>{partner ? partner.name : ''}</Name>
      {/* <Stars
        score={partner ? partner.evaluate : 0}
        size={50}
        marginBottom={64}
      /> */}
      <ButtonContainer>
        <Button
          type="white"
          text="とじる"
          width={272}
          height={112}
          fontSize={40}
          onClick={() => close()}
        />
        <Button
          type="blue"
          text="詳細を見る"
          width={272}
          height={112}
          fontSize={40}
          link={resolvePath.page('teachers', path)}
          onClick={() => close()}
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
  margin-bottom: 40px;
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
