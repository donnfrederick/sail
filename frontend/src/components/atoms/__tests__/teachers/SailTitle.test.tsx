import SailTitle from 'components/atoms/teachers/SailTitle'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SailTitle />', () => {
  const tree = renderer.create(<SailTitle />).toJSON()
  expect(tree).toMatchSnapshot()
})
