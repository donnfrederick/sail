import Router from 'components/organisms/Router'
import ProfileEditName from 'components/pages/teachers/Profile/EditName'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEditName />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEditName />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
