import Router from 'components/organisms/Router'
import ProfileEdit from 'components/organisms/teachers/profile_edit'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEdit />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEdit />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
