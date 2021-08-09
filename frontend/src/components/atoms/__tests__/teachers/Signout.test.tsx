import Signout from 'components/atoms/teachers/Signout'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Signout />', () => {
  const tree = renderer
    .create(
      <Router>
        <Signout marginBottom={24} onClick={() => null} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
