import Router from 'components/organisms/Router'
import CompleteReservation from 'components/organisms/students/modal_contents/complete_reservation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <CompleteReservation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <CompleteReservation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
