import Router from 'components/organisms/Router'
import StudentsIndex from 'components/templates/students/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
