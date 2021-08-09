import Router from 'components/organisms/Router'
import TeachersReservationNew from 'components/pages/teachers/Reservations/New'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersReservationNew />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersReservationNew />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
