import Router from 'components/organisms/Router'
import ProfileEditPassword from 'components/templates/students/profile/EditPassword'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ProfileEditPassword />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ProfileEditPassword />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
