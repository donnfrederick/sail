import Router from 'components/organisms/Router'
import ConfirmRemoveFavorite from 'components/organisms/teachers/modal_contents/confirm_remove_favorite'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmRemoveFavorite />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConfirmRemoveFavorite favoritedUserId={1} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
