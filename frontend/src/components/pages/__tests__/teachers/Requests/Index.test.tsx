import Router from 'components/organisms/Router'
import RequestsIndex from 'components/pages/teachers/Requests/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <RequestsIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <RequestsIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
