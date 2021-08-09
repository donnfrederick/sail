import ModalReservedDate from 'components/atoms/teachers/ModalReservedDate'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ModalReservedDate />', () => {
  const tree = renderer
    .create(<ModalReservedDate date={'date'} time={'time'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
