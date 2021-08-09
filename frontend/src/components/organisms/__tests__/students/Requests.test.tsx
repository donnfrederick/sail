import Router from 'components/organisms/Router'
import Requests from 'components/organisms/students/requests'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Requests />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Requests />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
