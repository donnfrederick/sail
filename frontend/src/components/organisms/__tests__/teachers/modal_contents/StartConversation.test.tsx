import Router from 'components/organisms/Router'
import StartConversation from 'components/organisms/teachers/modal_contents/start_conversation'
import { conversation } from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <StartConversation />', () => {
  const tree = renderer
    .create(
      <Router>
        <StartConversation
          conversation={conversation}
          path={'conversations/1'}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
