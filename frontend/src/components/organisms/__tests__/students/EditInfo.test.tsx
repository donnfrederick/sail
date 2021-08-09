import Router from 'components/organisms/Router'
import EditInfo from 'components/organisms/students/edit_info'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <EditInfo />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <EditInfo />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
