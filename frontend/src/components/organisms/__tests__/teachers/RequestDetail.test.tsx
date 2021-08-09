import Router from 'components/organisms/Router'
import RequestDetail from 'components/organisms/teachers/request_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <RequestDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <RequestDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
