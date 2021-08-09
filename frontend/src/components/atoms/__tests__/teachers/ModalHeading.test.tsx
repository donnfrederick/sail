import ModalHeading from 'components/atoms/teachers/ModalHeading'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ModalHeading />', () => {
  const tree = renderer.create(<ModalHeading text={'Heading'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
