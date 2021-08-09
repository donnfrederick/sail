import RequestCard from 'components/molecules/teachers/RequestCard'
import Router from 'components/organisms/Router'
import * as conversationSampleData from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <RequestCard />', () => {
  const requestConversation =
    conversationSampleData.requestConversationInConversation
  const userDetailPath = ''
  const setContents = (content: JSX.Element) => {}
  const open = () => {}
  const tree = renderer
    .create(
      <Router>
        <RequestCard
          requestConversation={requestConversation}
          userDetailPath={userDetailPath}
          setContents={setContents}
          open={open}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
