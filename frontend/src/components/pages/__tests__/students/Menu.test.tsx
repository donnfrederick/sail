import Router from 'components/organisms/Router'
import StudentsMenu from 'components/pages/students/Menu'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsMenu />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsMenu />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
