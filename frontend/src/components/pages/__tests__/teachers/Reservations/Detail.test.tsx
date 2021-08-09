import Router from 'components/organisms/Router'
import TeachersReservationDetail from 'components/pages/teachers/Reservations/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersReservationDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersReservationDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
