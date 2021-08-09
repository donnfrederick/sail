import Router from 'components/organisms/Router'
import ProfileEditEmail from 'components/pages/teachers/Profile/EditEmail'
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
