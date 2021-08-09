import * as React from 'react'

import UserProfile from 'components/organisms/students/user_profile'
import withFavoriteId from 'hocs/withFavoriteId'
import * as UserProfileModels from 'models/userProfile'

interface Props {
  favoritedUser: UserProfileModels.UserProfile | null
}

export default withFavoriteId(
  ({ favoritedUser }: Props) =>
    favoritedUser ? <UserProfile user={favoritedUser} type="complete" /> : null
)
