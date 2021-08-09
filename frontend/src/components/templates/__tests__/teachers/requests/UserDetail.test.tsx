import Router from 'components/organisms/Router'
import RequestsUserDetail from 'components/templates/teachers/requests/UserDetail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <RequestsUserDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <RequestsUserDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
