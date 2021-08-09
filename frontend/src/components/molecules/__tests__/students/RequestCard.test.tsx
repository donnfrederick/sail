import RequestCard from 'components/molecules/students/RequestCard'
import Router from 'components/organisms/Router'
import * as conversationSampleData from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <RequestCard />', () => {
  const studentsRequestConversation = conversationSampleData.requestConversation
  const setContents = (content: JSX.Element) => {}
  const open = () => {}
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <RequestCard
            myId={1}
            studentsRequestConversation={studentsRequestConversation}
            type="brief"
            setContents={setContents}
            open={open}
          />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
