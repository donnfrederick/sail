import Router from 'components/organisms/Router'
import ProfileEditPassword from 'components/pages/teachers/Profile/EditPassword'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEditPassword />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEditPassword />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
