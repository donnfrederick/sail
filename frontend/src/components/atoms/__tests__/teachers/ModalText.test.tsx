import ModalText from 'components/atoms/teachers/ModalText'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ModalText />', () => {
  const tree = renderer.create(<ModalText text={'text'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
