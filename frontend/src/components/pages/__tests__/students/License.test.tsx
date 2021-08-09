import Router from 'components/organisms/Router'
import StudentsLicense from 'components/pages/students/License'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsLicense />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsLicense />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
