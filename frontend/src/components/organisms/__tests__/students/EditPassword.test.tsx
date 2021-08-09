import Router from 'components/organisms/Router'
import EditPassword from 'components/organisms/students/edit_password'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <EditPassword />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <EditPassword />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
