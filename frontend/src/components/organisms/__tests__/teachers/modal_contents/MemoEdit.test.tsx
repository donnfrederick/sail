import Router from 'components/organisms/Router'
import MemoEdit from 'components/organisms/teachers/modal_contents/memo_edit'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <MemoEdit />', () => {
  const tree = renderer
    .create(
      <Router>
        <MemoEdit />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
