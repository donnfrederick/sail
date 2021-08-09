import Router from 'components/organisms/Router'
import ConfirmUnblock from 'components/organisms/teachers/modal_contents/confirm_unblock'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmUnblock />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConfirmUnblock />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
