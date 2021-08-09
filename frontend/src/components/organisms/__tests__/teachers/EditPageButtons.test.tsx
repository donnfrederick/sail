import Router from 'components/organisms/Router'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditPageButtons />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditPageButtons />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
