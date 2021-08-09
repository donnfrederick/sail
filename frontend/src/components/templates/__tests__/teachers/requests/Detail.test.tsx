import Router from 'components/organisms/Router'
import RequestsDetail from 'components/templates/teachers/requests/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <RequestsDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <RequestsDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
