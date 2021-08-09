import * as React from 'react'
import * as renderer from 'react-test-renderer'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'

test('render <ModalTextContainer />', () => {
  const tree = renderer.create(<ModalTextContainer heading={'heading'} text={'Heading'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
