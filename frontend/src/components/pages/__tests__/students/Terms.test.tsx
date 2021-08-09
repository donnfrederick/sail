import Router from 'components/organisms/Router'
import StudentsTerms from 'components/pages/students/Terms'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsTerms />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsTerms />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
