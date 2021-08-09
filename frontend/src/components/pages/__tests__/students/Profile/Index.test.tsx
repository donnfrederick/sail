import Router from 'components/organisms/Router'
import StudentsProfileIndex from 'components/pages/students/Profile/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsProfileIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsProfileIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
