import ListItem from 'components/atoms/students/ListItem'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ListItem />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ListItem text="List Item" link={''} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
