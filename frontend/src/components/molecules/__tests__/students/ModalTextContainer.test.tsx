import * as React from 'react'
import * as renderer from 'react-test-renderer'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import { Intl } from 'components/organisms/Intl'

test('render <ModalTextContainer />', () => {
  const tree = renderer.create(
    <Intl>
      <ModalTextContainer heading={'heading'} text={'Heading'} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
