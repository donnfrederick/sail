import PurposeText from 'components/atoms/students/PurposeText'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <PurposeText />', () => {
  const tree = renderer.create(
    <Intl>
      <PurposeText />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
