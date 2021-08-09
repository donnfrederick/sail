import Router from 'components/organisms/Router'
import NotificationsSummary from 'components/organisms/students/notifications_summary'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <NotificationsSummary />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <NotificationsSummary />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
