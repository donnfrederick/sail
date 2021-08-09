import ConversationHistoryCard from 'components/molecules/students/ConversationHistoryCard'
import Router from 'components/organisms/Router'
import * as sampleData from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationHistoryCard />', () => {
  const setContentsFn = (contents: JSX.Element) => {}
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConversationHistoryCard
            myId={1}
            open={() => {}}
            conversation={sampleData.conversation}
            setContents={setContentsFn}
          />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
