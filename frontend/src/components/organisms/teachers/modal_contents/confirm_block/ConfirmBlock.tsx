import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import CompleteBlockModal from 'components/organisms/teachers/modal_contents/complete_block'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as BlocksModels from 'models/blocks'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  myId: number
  close(): void
  postBlocks(
    authToken: string,
    parameters: BlocksModels.PostBlocksRequest
  ): Promise<void>
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    authToken,
    close,
    conversation,
    myId,
    postBlocks,
    setContents
  } = props

  const partner = conversation ? getPartner(conversation, myId) : null

  return (
    <Container>
      <ModalTextContainer heading={'この学生をブロックしますか？'} />
      <RoundImage
        src={partner ? partner.picture_url : ''}
        size={200}
        marginBottom={24}
        code={partner ? partner.country_code : ''}
      />
      <Name>{partner ? partner.name : ''}</Name>
      <Text>
        {
          '※ブロックした学生は、あなたと会話することができなくなります。また、あなたの情報はブロックした学生側には表示されなくなります。'
        }
      </Text>
      <ButtonContainer>
        <Button
          type="white"
          text="いいえ"
          width={272}
          height={112}
          fontSize={40}
          onClick={() => close()}
        />
        <Button
          type="red"
          text="はい"
          width={272}
          height={112}
          fontSize={40}
          onClick={async () => {
            if (partner) {
              const parameters: BlocksModels.PostBlocksRequest = {
                user_id: partner.id
              }

              try {
                await postBlocks(authToken, parameters)
                setContents(<CompleteBlockModal />)
              } catch (error) {
                // tslint:disable-next-line
                console.error(error)
                setContents(<FailFetchingModal />)
              }
            }
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
  margin-bottom: 48px;
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

const Text = styled.div`
  width: 530px;
  margin: 0 auto 50px;
  padding-left: 1em;
  font-size: 24px;
  line-height: 1.38;
  color: #405766;
  text-align: left;
  text-indent: -1em;
`
