import Router from 'components/organisms/Router'
import StudentsPasswordReset from 'components/templates/students/PasswordReset'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsPasswordReset />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsPasswordReset />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
