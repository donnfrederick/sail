import Router from 'components/organisms/Router'
import Signout from 'components/organisms/students/signout'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Signout />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Signout text="Sail" returnPath="/" />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
