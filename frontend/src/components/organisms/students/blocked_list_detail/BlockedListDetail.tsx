import * as React from 'react'

import UserProfile from 'components/organisms/students/user_profile'
import withBlockedId from 'hocs/withBlockedId'
import * as UserProfileModels from 'models/userProfile'

interface Props {
  blockedUser: UserProfileModels.UserProfile | null
}

export default withBlockedId(
  ({ blockedUser }: Props) =>
    blockedUser ? <UserProfile user={blockedUser} type="block" /> : null
)
