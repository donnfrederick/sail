import Router from 'components/organisms/Router'
import StudentsNotificationsIndex from 'components/templates/students/notifications/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsNotificationsIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsNotificationsIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
