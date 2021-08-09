import ReservationCard from 'components/molecules/students/ReservationCard'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ReservationCard />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <div>
            <ReservationCard status="queued" to="conversations" />
            <ReservationCard status="empty" to="conversations" />
          </div>
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
