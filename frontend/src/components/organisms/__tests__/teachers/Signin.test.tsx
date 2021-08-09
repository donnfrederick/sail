import Router from 'components/organisms/Router'
import Signup from 'components/organisms/teachers/signup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Signup />', () => {
  const tree = renderer
    .create(
      <Router>
        <Signup />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
