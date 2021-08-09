import Router from 'components/organisms/Router'
import TeachersAbout from 'components/pages/teachers/About'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersAbout />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersAbout />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
