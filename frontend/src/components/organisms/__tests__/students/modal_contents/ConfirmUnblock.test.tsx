import Router from 'components/organisms/Router'
import ConfirmUnblock from 'components/organisms/students/modal_contents/confirm_unblock'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConfirmUnblock />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConfirmUnblock />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
