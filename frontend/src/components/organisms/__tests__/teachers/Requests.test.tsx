import Router from 'components/organisms/Router'
import Requests from 'components/organisms/teachers/requests'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Requests />', () => {
  const tree = renderer
    .create(
      <Router>
        <Requests />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
