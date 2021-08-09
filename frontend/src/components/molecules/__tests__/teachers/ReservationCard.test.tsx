import ReservationCard from 'components/molecules/teachers/ReservationCard'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ReservationCard />', () => {
  const tree = renderer
    .create(
      <Router>
        <div>
          <ReservationCard status="queued" />
          <ReservationCard status="no-reserved" />
          <ReservationCard status="waiting" />
        </div>
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
