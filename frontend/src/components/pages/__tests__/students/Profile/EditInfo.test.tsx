import Router from 'components/organisms/Router'
import StudentsProfileEditInfo from 'components/pages/students/Profile/EditInfo'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsProfileEditInfo />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsProfileEditInfo />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
