import SupportHeading from 'components/atoms/students/SupportHeading'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <SupportHeading />', () => {
  const tree = renderer.create(
    <Intl>
      <SupportHeading text="Heading" />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
