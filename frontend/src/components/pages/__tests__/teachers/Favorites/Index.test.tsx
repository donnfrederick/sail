import Router from 'components/organisms/Router'
import FavoritesIndex from 'components/pages/teachers/Favorites/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FavoritesIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <FavoritesIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
