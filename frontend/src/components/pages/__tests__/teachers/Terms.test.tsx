import Router from 'components/organisms/Router'
import TeachersTerms from 'components/pages/teachers/Terms'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersTerms />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersTerms />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
