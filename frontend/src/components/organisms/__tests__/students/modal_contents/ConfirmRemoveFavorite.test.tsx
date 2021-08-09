import Router from 'components/organisms/Router'
import ConfirmRemoveFavorite from 'components/organisms/students/modal_contents/confirm_remove_favorite'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConfirmRemoveFavorite />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConfirmRemoveFavorite favoritedUserId={1} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
