import MenuList, { Item } from 'components/molecules/students/MenuList'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <MenuList />', () => {
  const items: Item[] = [
    {
      text: 'Menu Items',
      link: '',
      intlid: ''
    }
  ]
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <MenuList items={items} marginBottom={64} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
