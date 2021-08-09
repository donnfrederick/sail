import Router from 'components/organisms/Router'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Header />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Header text="Sail" returnPath="/" />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
