import * as React from 'react'

import UserProfile from 'components/organisms/teachers/user_profile'
import withBlockedId from 'hocs/withBlockedId'
import * as UserProfileModels from 'models/userProfile'

interface Props {
  blockedUser: UserProfileModels.UserProfile | null
}

export default withBlockedId(({ blockedUser }: Props) => {
  return blockedUser ? <UserProfile user={blockedUser} type="block" /> : null
})
