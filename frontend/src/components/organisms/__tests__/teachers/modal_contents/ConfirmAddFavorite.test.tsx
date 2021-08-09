import Router from 'components/organisms/Router'
import ConfirmAddFavorite from 'components/organisms/teachers/modal_contents/confirm_add_favorite'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmBlock />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConfirmAddFavorite addFavoriteUserId={1} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
