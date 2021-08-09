import Router from 'components/organisms/Router'
import UserProfile from 'components/organisms/teachers/user_profile'
import { userProfile } from 'mocks/sampleData/userProfile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <UserProfile />', () => {
  const tree = renderer
    .create(
      <Router>
        <UserProfile type="basic" user={userProfile} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
