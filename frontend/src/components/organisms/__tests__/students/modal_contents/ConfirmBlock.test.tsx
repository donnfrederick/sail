import Router from 'components/organisms/Router'
import ConfirmBlock from 'components/organisms/students/modal_contents/confirm_block'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConfirmBlock />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConfirmBlock />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
