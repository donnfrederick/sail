import ConversationHistoryCard from 'components/molecules/teachers/ConversationHistoryCard'
import Router from 'components/organisms/Router'
import * as sampleData from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationHistoryCard />', () => {
  const open = () => {}
  const setContents = (content: JSX.Element) => {}
  const tree = renderer
    .create(
      <Router>
        <ConversationHistoryCard
          open={open}
          setContents={setContents}
          myId={1}
          conversation={sampleData.conversation}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
