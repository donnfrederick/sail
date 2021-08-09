import Router from 'components/organisms/Router'
import Reservation from 'components/organisms/teachers/modal_contents/reservation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Reservation />', () => {
  const tree = renderer
    .create(
      <Router>
        <Reservation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
