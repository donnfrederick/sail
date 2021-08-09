import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import { history } from 'components/organisms/Router'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import * as FavoritesModels from 'models/favorites'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  favoritedUserId: number
  close(): void
  deleteFavorites(
    authToken: string,
    parameters: FavoritesModels.DeleteFavoritesRequest
  ): Promise<void>
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    authToken,
    close,
    deleteFavorites,
    favoritedUserId,
    setContents
  } = props

  return (
    <Container>
      <ModalTextContainer
        heading={'Remove this person from the favorite list?'}
      />
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
            const parameters: FavoritesModels.DeleteFavoritesRequest = {
              user_id: favoritedUserId
            }

            try {
              await deleteFavorites(authToken, parameters)
              close()
              // 仮
              const regexp = /history/
              const matches = history.location.pathname.match(regexp)
              if (matches) {
                window.location.reload()
              } else {
                history.goBack()
              }
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
