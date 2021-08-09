import UserSatisfaction from 'components/atoms/teachers/user_profile/UserSatisfaction'
import { userProfile } from 'mocks/sampleData/userProfile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <UserSatisfaction />', () => {
  const tree = renderer
    .create(
      <UserSatisfaction
        conversationNumber={9}
        satisfaction={userProfile.evaluate}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
