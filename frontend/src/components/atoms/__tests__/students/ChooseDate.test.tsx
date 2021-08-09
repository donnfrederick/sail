import ChooseDate from 'components/atoms/students/ChooseDate'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ChooseDate />', () => {
  const tree = renderer.create(
    <Intl>
      <ChooseDate />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
