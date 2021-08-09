import Router from 'components/organisms/Router'
import Confirm from 'components/organisms/teachers/confirm'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Confirm />', () => {
  const tree = renderer
    .create(
      <Router>
        <Confirm />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
