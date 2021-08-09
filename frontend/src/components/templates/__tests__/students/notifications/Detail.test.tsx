import Router from 'components/organisms/Router'
import StudentsNotificationsDetail from 'components/templates/students/notifications/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsNotificationsDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsNotificationsDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
