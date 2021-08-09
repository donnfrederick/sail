import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
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
      <ModalTextContainer heading={'本当に通話を終了しますか？'} />
      <ButtonContainer>
        <Button
          type="blue"
          text="いいえ"
          width={272}
          height={112}
          onClick={() => close()}
        />
        <Button
          type="white"
          text="はい"
          width={272}
          height={112}
          link={resolvePath.page(
            'teachers',
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
