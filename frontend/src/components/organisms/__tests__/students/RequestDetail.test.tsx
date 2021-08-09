import Router from 'components/organisms/Router'
import RequestDetail from 'components/organisms/students/request_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <RequestDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <RequestDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
