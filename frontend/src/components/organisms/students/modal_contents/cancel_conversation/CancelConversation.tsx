import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import { store } from 'components/organisms/Router'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  close(): void
  deleteConversations(authToken: string, id: number): Promise<void>
  open(): void
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    authToken,
    conversation,
    close,
    deleteConversations,
    open,
    setContents
  } = props

  return (
    <Container>
      <ModalTextContainer heading={'Do you want to cancel the conversation?'} />
      <ButtonContainer>
        <Button
          type="blue"
          text="No"
          width={244}
          height={88}
          fontSize={32}
          onClick={() => close()}
        />
        <Button
          type="white"
          text="OK"
          width={244}
          height={88}
          fontSize={32}
          onClick={async () => {
            if (conversation) {
              try {
                await deleteConversations(authToken, conversation.id)
                close()
                store.dispatch(push(resolvePath.page('students', 'mypage')))
              } catch (error) {
                close()
                setContents(<FailFetchingModal error={error} />)
                open()
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
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
