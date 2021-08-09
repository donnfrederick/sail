import Router from 'components/organisms/Router'
import StudentsAbout from 'components/pages/students/About'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsAbout />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsAbout />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
