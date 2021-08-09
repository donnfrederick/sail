import Router from 'components/organisms/Router'
import CompleteAddFavorite from 'components/organisms/students/modal_contents/complete_add_favorite'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <CompleteAddFavorite />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <CompleteAddFavorite />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
