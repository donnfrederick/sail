import Router from 'components/organisms/Router'
import EditEmail from 'components/organisms/teachers/edit_email'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditEmail />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditEmail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
