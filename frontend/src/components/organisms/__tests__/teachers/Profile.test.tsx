import Router from 'components/organisms/Router'
import Profile from 'components/organisms/teachers/profile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Profile />', () => {
  const tree = renderer
    .create(
      <Router>
        <Profile />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
