import Router from 'components/organisms/Router'
import ConversationHistoryDetail from 'components/pages/students/ConversationHistory/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationHistoryIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConversationHistoryDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
