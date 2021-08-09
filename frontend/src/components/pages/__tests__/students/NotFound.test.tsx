import Router from 'components/organisms/Router'
import StudentsNotFound from 'components/pages/students/NotFound'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsNotFound />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsNotFound />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
