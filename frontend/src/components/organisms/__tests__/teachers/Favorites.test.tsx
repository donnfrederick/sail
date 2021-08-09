import Router from 'components/organisms/Router'
import Favorites from 'components/organisms/teachers/favorites'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Favorites />', () => {
  const tree = renderer
    .create(
      <Router>
        <Favorites />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
