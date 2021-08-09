import ModalHeading from 'components/atoms/students/ModalHeading'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ModalHeading />', () => {
  const tree = renderer.create(
    <Intl>
      <ModalHeading text={'Heading'} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
