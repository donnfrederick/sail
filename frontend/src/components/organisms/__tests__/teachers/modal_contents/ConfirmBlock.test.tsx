import Router from 'components/organisms/Router'
import ConfirmBlock from 'components/organisms/teachers/modal_contents/confirm_block'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmBlock />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConfirmBlock />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
