import Router from 'components/organisms/Router'
import NotificationsSummary from 'components/organisms/teachers/notifications_summary'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <NotificationsSummary />', () => {
  const tree = renderer
    .create(
      <Router>
        <NotificationsSummary />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
