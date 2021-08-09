import Router from 'components/organisms/Router'
import CompleteAccusation from 'components/organisms/students/modal_contents/complete_accusation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <CompleteAccusation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <CompleteAccusation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
