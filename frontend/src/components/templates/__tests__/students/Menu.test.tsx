import Router from 'components/organisms/Router'
import Menu from 'components/templates/students/Menu'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Menu />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Menu />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
