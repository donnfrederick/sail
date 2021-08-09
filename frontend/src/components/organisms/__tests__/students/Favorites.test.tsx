import Router from 'components/organisms/Router'
import Favorites from 'components/organisms/students/favorites'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Favorites />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Favorites />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
