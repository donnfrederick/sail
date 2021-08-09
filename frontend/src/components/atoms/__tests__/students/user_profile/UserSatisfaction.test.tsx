import UserSatisfaction from 'components/atoms/students/user_profile/UserSatisfaction'
import { userProfile } from 'mocks/sampleData/userProfile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <UserSatisfaction />', () => {
  const tree = renderer
    .create(
      <Intl>
        <UserSatisfaction
          conversationNumber={9}
          satisfaction={userProfile.evaluate}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
