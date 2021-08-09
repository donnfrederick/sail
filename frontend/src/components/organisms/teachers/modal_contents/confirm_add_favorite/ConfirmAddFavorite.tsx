import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import CompleteAddFavoriteModal from 'components/organisms/teachers/modal_contents/complete_add_favorite'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as FavoritesModels from 'models/favorites'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  addFavoritedUserId: number
  close(): void
  postFavorites(
    authToken: string,
    parameters: FavoritesModels.PostFavoritesRequest
  ): Promise<void>
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    authToken,
    addFavoritedUserId,
    close,
    postFavorites,
    setContents
  } = props

  return (
    <Container>
      <ModalTextContainer heading={'この学生をお気に入りに追加しますか？'} />
      <Text>
        {
          'お気に入りに追加した学生は、[メニュー] > [お気に入り一覧] から確認することができます。'
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
          type="blue"
          text="はい"
          width={272}
          height={112}
          fontSize={40}
          onClick={async () => {
            if (addFavoritedUserId) {
              const parameters: FavoritesModels.PostFavoritesRequest = {
                user_id: addFavoritedUserId
              }

              try {
                await postFavorites(authToken, parameters)
                setContents(<CompleteAddFavoriteModal />)
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
