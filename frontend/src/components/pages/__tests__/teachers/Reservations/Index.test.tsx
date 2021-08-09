import Router from 'components/organisms/Router'
import TeachersReservationIndex from 'components/pages/teachers/Reservations/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersReservationIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersReservationIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
