import Router from 'components/organisms/Router'
import TeachersFaq from 'components/templates/teachers/Faq'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersFaq />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersFaq />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
