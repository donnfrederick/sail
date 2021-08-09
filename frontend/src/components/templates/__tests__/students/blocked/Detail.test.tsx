import Router from 'components/organisms/Router'
import StudentsBlockedDetail from 'components/templates/students/blocked/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsBlockedDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsBlockedDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
