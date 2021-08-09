import Router from 'components/organisms/Router'
import UserProfile from 'components/organisms/students/user_profile'
import { userProfile } from 'mocks/sampleData/userProfile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <UserProfile />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <UserProfile type="basic" user={userProfile} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
