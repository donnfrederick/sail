import Router from 'components/organisms/Router'
import ProfileEditEmail from 'components/templates/teachers/profile/EditEmail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEditEmail />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEditEmail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
