import Router from 'components/organisms/Router'
import BlockedListDetail from 'components/organisms/teachers/blocked_list_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <BlockedListDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <BlockedListDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
