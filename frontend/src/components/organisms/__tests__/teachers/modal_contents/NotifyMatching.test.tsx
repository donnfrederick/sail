import Router from 'components/organisms/Router'
import NotifyMatching from 'components/organisms/teachers/modal_contents/notify_matching'
import { conversation } from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <NotifyMatching />', () => {
  const tree = renderer
    .create(
      <Router>
        <NotifyMatching
          conversation={conversation}
          path={'reservations/detail/1'}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
