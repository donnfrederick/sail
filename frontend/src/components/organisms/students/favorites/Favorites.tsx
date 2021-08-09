import Button from 'components/atoms/teachers/Button'
import * as React from 'react'
import styled from 'styled-components'

import FavoriteCard from 'components/molecules/FavoriteCard'
import withFavorites from 'hocs/withFavorites'
import * as FavoritesModels from 'models/favorites'
import { UserProfile as User } from 'models/userProfile'
import resolvePath from 'utils/resolvePath'

interface Props {
  authToken: string
  favorites: User[]
  meta: FavoritesModels.Meta
  page: number
  forward(): void
  getFavorites(
    authToken: string,
    request: FavoritesModels.GetFavoritesRequest
  ): Promise<void>
}

export default withFavorites(
  ({ authToken, favorites, meta, page, forward, getFavorites }: Props) => {
    if (!favorites.length) {
      return null
    }

    return (
      <Container>
        <FavoriteCards />
        {favorites.map((favorite: any, index: number) => (
          <FavoriteCard user={favorite} key={index} />
        ))}
        <Buttons hasNext={meta.next_page}>
          <Button
            type="white"
            text="Back"
            width={344}
            height={112}
            fontSize={40}
            link={resolvePath.page('students', 'mypage')}
          />
          {meta.next_page ? (
            <Button
              type="blue"
              text="Load More"
              width={344}
              height={112}
              fontSize={40}
              onClick={() => {
                getFavorites(authToken, {
                  page: page + 1
                })
                forward()
              }}
            />
          ) : null}
        </Buttons>
      </Container>
    )
  }
)

const Container = styled.div`
  width: 686px;
  margin: 0 auto;
`

const FavoriteCards = styled.div``

const Buttons = styled<{ hasNext: boolean }, any>('div')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 56px;
  display: flex;
  justify-content: ${props => (props.hasNext ? 'space-between' : 'center')};
  width: 720px;
  margin: 0 auto;
`
