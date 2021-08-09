import Router from 'components/organisms/Router'
import FavoritesDetail from 'components/organisms/teachers/favorites_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FavoritesDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <FavoritesDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
