import Router from 'components/organisms/Router'
import TrialRemainingConvos from 'components/organisms/students/modal_contents/trial_remaining_convos'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <TrialRemainingConvos />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <TrialRemainingConvos />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
