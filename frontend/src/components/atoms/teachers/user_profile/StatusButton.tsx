import * as React from 'react'

import Button from 'components/atoms/teachers/Button'
import FavoriteButton from 'components/atoms/teachers/FavoriteButton'
import ConfirmAddFavorite from 'components/organisms/teachers/modal_contents/confirm_add_favorite'
import ConfirmRemoveFavorite from 'components/organisms/teachers/modal_contents/confirm_remove_favorite'
import ConfirmUnblock from 'components/organisms/teachers/modal_contents/confirm_unblock'

interface Props {
  isBlocked: boolean
  isFavorite: boolean
  userId: number
  open(): void
  setContents(contents: JSX.Element): void
}

export default ({ isBlocked, userId, setContents, isFavorite, open }: Props) =>
  isBlocked ? (
    <Button
      type="red"
      text="ブロック中"
      fontSize={28}
      width={210}
      height={56}
      onClick={() => {
        setContents(<ConfirmUnblock blockedUserId={userId} />)
        open()
      }}
    />
  ) : (
    <FavoriteButton
      isFavorite={isFavorite}
      onClick={() => {
        setContents(
          isFavorite ? (
            <ConfirmRemoveFavorite favoritedUserId={userId} />
          ) : (
            <ConfirmAddFavorite addFavoritedUserId={userId} />
          )
        )
        open()
      }}
    />
  )
