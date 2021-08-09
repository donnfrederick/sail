import Router from 'components/organisms/Router'
import MemoEdit from 'components/organisms/students/modal_contents/memo_edit'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <MemoEdit />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <MemoEdit />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
