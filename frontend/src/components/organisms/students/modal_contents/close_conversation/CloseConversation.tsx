import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  conversation: ConversationModels.Conversation | null
  close(): void
}

export default (props: Props) => {
  const { conversation, close } = props

  return (
    <Container>
      <ModalTextContainer heading={'Do you want to end the call?'} />
      <ButtonContainer>
        <Button
          type="blue"
          text="Cancel"
          width={244}
          height={88}
          onClick={() => close()}
        />
        <Button
          type="white"
          text="OK"
          width={244}
          height={88}
          link={resolvePath.page(
            'students',
            conversation ? `conversations/${conversation.id}/end` : 'mypage'
          )}
          onClick={() => close()}
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
