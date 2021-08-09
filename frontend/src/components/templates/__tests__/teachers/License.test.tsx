import Router from 'components/organisms/Router'
import TeachersLicense from 'components/templates/teachers/License'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersLicense />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersLicense />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
