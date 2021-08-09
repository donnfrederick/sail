import Router from 'components/organisms/Router'
import ConfirmAddFavorite from 'components/organisms/students/modal_contents/confirm_add_favorite'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConfirmBlock />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConfirmAddFavorite addFavoriteUserId={1} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
