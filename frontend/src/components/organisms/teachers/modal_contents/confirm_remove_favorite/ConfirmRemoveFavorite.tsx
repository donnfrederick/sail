import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import { history } from 'components/organisms/Router'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
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
    favoritedUserId,
    close,
    deleteFavorites,
    setContents
  } = props

  return (
    <Container>
      <ModalTextContainer heading={'この学生をお気に入りから外しますか？'} />
      <ButtonContainer>
        <Button
          type="red"
          text="いいえ"
          width={272}
          height={112}
          fontSize={40}
          onClick={() => close()}
        />
        <Button
          type="white"
          text="はい"
          width={272}
          height={112}
          fontSize={40}
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
