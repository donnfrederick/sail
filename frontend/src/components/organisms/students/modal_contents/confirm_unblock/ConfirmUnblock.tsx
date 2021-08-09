import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import { history } from 'components/organisms/Router'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
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
      <ModalTextContainer heading={'Unblock the user?'} />
      <ButtonContainer>
        <Button
          type="white"
          text="Cancel"
          width={244}
          height={88}
          fontSize={32}
          onClick={() => close()}
        />
        <Button
          type="blue"
          text="OK"
          width={244}
          height={88}
          fontSize={32}
          onClick={async () => {
            const parameters: BlocksModels.DeleteBlocksRequest = {
              user_id: blockedUserId
            }

            try {
              await deleteBlocks(authToken, parameters)
              close()
              history.goBack()
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
