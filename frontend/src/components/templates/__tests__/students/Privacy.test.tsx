import Router from 'components/organisms/Router'
import StudentsPrivacy from 'components/templates/students/Privacy'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsPrivacy />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsPrivacy />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
