import Router from 'components/organisms/Router'
import ProfileEditGender from 'components/templates/teachers/profile/EditGender'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEditGender />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEditGender />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
