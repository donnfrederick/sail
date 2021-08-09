import * as React from 'react'
import * as renderer from 'react-test-renderer'
import ModalText from 'components/atoms/students/ModalText'
import { Intl } from 'components/organisms/Intl'

test('render <ModalText />', () => {
  const tree = renderer.create(
    <Intl>
      <ModalText text={'text'} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
