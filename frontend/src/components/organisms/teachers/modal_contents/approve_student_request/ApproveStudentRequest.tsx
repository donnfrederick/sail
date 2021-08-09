import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import CompleteApproveStudentRequestModal from 'components/organisms/teachers/modal_contents/complete_approve_student_request'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  teachersRequestConversation: ConversationModels.RequestConversationInConversation | null
  close(): void
  postApproveRequestConversations(
    authToken: string,
    conversationRequestId: number
  ): Promise<void>
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    authToken,
    close,
    teachersRequestConversation,
    postApproveRequestConversations,
    setContents
  } = props

  const partner = teachersRequestConversation
    ? teachersRequestConversation.user
    : null

  return teachersRequestConversation ? (
    <Container>
      <ModalTextContainer heading={'この方と会話の予約をしますか？'} />
      <RoundImage
        src={partner ? partner.picture_url : ''}
        size={200}
        marginBottom={24}
        code={partner ? partner.country_code : ''}
      />
      <Name>{partner ? partner.name : ''}</Name>
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
          type="blue"
          text="はい"
          width={272}
          height={112}
          fontSize={40}
          onClick={async () => {
            if (partner) {
              try {
                await postApproveRequestConversations(
                  authToken,
                  teachersRequestConversation.id
                )
                setContents(<CompleteApproveStudentRequestModal />)
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
  ) : null
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
