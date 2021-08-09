import Router from 'components/organisms/Router'
import StudentsPasswordRenew from 'components/pages/students/PasswordRenew'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsPasswordRenew />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsPasswordRenew />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
