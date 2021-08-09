import Router from 'components/organisms/Router'
import ReservationsDetail from 'components/organisms/students/reservations_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ReservationsDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ReservationsDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
