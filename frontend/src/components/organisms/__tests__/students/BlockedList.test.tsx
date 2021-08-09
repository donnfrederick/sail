import Router from 'components/organisms/Router'
import BlockedList from 'components/organisms/students/blocked_list'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <BlockedList />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <BlockedList />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
