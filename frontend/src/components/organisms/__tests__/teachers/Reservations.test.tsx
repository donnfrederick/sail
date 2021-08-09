import Router from 'components/organisms/Router'
import Reservations from 'components/organisms/teachers/reservations'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Requests />', () => {
  const tree = renderer
    .create(
      <Router>
        <Reservations />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
