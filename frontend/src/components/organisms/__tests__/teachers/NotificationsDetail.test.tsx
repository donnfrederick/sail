import Router from 'components/organisms/Router'
import NotificationsDetail from 'components/organisms/teachers/notifications_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <NotificationsDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <NotificationsDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
