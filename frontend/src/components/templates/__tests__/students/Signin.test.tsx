import Router from 'components/organisms/Router'
import StudentsSignin from 'components/templates/students/Signin'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsSignin />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsSignin />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
