import Router from 'components/organisms/Router'
import BlockedListDetail from 'components/organisms/students/blocked_list_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <BlockedListDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <BlockedListDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
