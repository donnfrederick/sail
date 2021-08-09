import Router from 'components/organisms/Router'
import RequestsIndex from 'components/pages/students/Requests/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <RequestsIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <RequestsIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
