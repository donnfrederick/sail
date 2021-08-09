import Router from 'components/organisms/Router'
import Signup from 'components/organisms/students/signup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Signup />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Signup />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
