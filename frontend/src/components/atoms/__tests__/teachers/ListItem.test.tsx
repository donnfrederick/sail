import ListItem from 'components/atoms/teachers/ListItem'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ListItem />', () => {
  const tree = renderer
    .create(
      <Router>
        <ListItem text="List Item" link={''} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
