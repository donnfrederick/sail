import Router from 'components/organisms/Router'
import FavoritesIndex from 'components/templates/students/favorites/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FavoritesIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FavoritesIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
