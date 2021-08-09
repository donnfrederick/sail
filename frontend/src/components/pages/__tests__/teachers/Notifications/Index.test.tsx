import Router from 'components/organisms/Router'
import TeachersNotificationsIndex from 'components/pages/teachers/Notifications/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersNotificationsIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersNotificationsIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
