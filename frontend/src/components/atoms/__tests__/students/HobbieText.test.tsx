import HobbieText from 'components/atoms/students/HobbieText'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <HobbieText />', () => {
  const tree = renderer.create(
    <Intl>
      <HobbieText />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
