import Router from 'components/organisms/Router'
import FavoritesDetail from 'components/templates/teachers/favorites/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FavoritesIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <FavoritesDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
