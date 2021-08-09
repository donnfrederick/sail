import Router from 'components/organisms/Router'
import FavoritesDetail from 'components/templates/students/favorites/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FavoritesIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FavoritesDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
