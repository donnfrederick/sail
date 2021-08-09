import Router from 'components/organisms/Router'
import SupportList from 'components/organisms/teachers/support_list'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SupportList />', () => {
  const tree = renderer
    .create(
      <Router>
        <SupportList />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
