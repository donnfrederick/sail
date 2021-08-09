import Router from 'components/organisms/Router'
import CompleteConversation from 'components/organisms/students/modal_contents/complete_evaluation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <CompleteConversation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <CompleteConversation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
