import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as BlocksModels from 'models/blocks'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  blockedUserId: number
  close(): void
  deleteBlocks(
    authToken: string,
    parameters: BlocksModels.DeleteBlocksRequest
  ): Promise<void>
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const { authToken, blockedUserId, close, deleteBlocks, setContents } = props

  return (
    <Container>
      <ModalTextContainer heading={'ブロックを解除しますか？'} />
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
            const parameters: BlocksModels.DeleteBlocksRequest = {
              user_id: blockedUserId
            }

            try {
              await deleteBlocks(authToken, parameters)
              close()
              window.location.href = '/teachers/blocked'
            } catch (error) {
              // tslint:disable-next-line
              console.error(error)
              setContents(<FailFetchingModal />)
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
