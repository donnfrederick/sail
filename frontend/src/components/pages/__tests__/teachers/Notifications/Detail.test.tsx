import Router from 'components/organisms/Router'
import TeachersNotificationsDetail from 'components/pages/teachers/Notifications/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersNotificationsDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersNotificationsDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
