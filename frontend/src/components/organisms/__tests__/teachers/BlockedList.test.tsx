import Router from 'components/organisms/Router'
import BlockedList from 'components/organisms/teachers/blocked_list'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <BlockedList />', () => {
  const tree = renderer
    .create(
      <Router>
        <BlockedList />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
