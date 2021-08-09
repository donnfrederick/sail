import * as React from 'react'

import Button from 'components/atoms/students/Button'
import FavoriteButton from 'components/atoms/students/FavoriteButton'
import ConfirmAddFavorite from 'components/organisms/students/modal_contents/confirm_add_favorite'
import ConfirmRemoveFavorite from 'components/organisms/students/modal_contents/confirm_remove_favorite'
import ConfirmUnblock from 'components/organisms/students/modal_contents/confirm_unblock'

interface Props {
  isBlocked: boolean
  isFavorite: boolean
  userId: number
  open(): void
  setContents(contents: JSX.Element): void
}

export default ({
  isBlocked,
  isFavorite,
  userId,
  setContents,
  open
}: Props) => {
  return isBlocked ? (
    <Button
      type="red"
      text="Blocked"
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
}
