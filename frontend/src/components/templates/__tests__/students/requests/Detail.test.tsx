import Router from 'components/organisms/Router'
import RequestsDetail from 'components/templates/students/requests/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ProfileIndex />', () => {
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
