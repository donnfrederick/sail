import SelectorArrow from 'components/atoms/students/SelectorArrow'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <SelectorArrow />', () => {
  const tree = renderer.create(
    <Intl>
      <SelectorArrow />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
