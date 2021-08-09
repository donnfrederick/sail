import Router from 'components/organisms/Router'
import StudentsProfileEditPassword from 'components/pages/students/Profile/EditPassword'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsProfileEditPassword />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsProfileEditPassword />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
