import Checklist from 'components/atoms/evaluation/Checklist'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Checklist />', () => {
  const tree = renderer
    .create(<Checklist text="このユーザーをブロックする" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
