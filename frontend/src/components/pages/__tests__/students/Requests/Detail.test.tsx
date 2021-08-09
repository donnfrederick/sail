import Router from 'components/organisms/Router'
import RequestsDetail from 'components/pages/students/Requests/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <RequestsDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <RequestsDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
