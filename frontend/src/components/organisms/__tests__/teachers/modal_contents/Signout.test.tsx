import Router from 'components/organisms/Router'
import Signout from 'components/organisms/teachers/modal_contents/signout'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Signout />', () => {
  const tree = renderer
    .create(
      <Router>
        <Signout />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
