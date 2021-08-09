import Router from 'components/organisms/Router'
import RequestsIndex from 'components/templates/teachers/requests/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <RequestsIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
