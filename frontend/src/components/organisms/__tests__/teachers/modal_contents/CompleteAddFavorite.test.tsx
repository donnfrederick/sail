import Router from 'components/organisms/Router'
import CompleteAddFavorite from 'components/organisms/teachers/modal_contents/complete_add_favorite'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <CompleteAddFavorite />', () => {
  const tree = renderer
    .create(
      <Router>
        <CompleteAddFavorite />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
