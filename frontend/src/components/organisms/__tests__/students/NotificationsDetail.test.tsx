import Router from 'components/organisms/Router'
import NotificationsDetail from 'components/organisms/students/notifications_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <NotificationsDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <NotificationsDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
