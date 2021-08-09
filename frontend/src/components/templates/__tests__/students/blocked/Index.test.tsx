import Router from 'components/organisms/Router'
import StudentsBlocked from 'components/templates/students/blocked/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsBlocked />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsBlocked />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
