import Router from 'components/organisms/Router'
import StudentDetail from 'components/organisms/teachers/student_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <StudentDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <StudentDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
