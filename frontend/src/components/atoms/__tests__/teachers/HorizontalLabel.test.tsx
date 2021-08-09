import HorizontalLabel from 'components/atoms/teachers/HorizontalLabel'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <HorizontalLabel />', () => {
  const tree = renderer.create(<HorizontalLabel text="国籍" />).toJSON()
  expect(tree).toMatchSnapshot()
})
