import Router from 'components/organisms/Router'
import StartConversation from 'components/organisms/students/modal_contents/start_conversation'
import { conversation } from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StartConversation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StartConversation
            conversation={conversation}
            path={'conversations/1'}
          />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
