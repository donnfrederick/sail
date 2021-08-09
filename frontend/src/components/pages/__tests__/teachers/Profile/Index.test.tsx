import Router from 'components/organisms/Router'
import ProfileIndex from 'components/pages/teachers/Profile/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
