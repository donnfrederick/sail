import Router from 'components/organisms/Router'
import StudentsFaq from 'components/templates/students/Faq'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsFaq />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsFaq />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
