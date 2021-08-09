import Router from 'components/organisms/Router'
import StudentsMypage from 'components/pages/students/Mypage'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsMypage />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsMypage />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
