import Router from 'components/organisms/Router'
import StudentsReservationsDetail from 'components/pages/students/Reservations/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsReservationsDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsReservationsDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
