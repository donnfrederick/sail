import Router from 'components/organisms/Router'
import Signin from 'components/organisms/students/signin'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Signin />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Signin />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
