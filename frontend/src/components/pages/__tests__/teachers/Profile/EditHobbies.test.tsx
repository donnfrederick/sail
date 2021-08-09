import Router from 'components/organisms/Router'
import ProfileEditHobbies from 'components/pages/teachers/Profile/EditHobbies'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEditHobbies />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEditHobbies />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
