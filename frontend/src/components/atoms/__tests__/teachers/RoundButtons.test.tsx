import RoundButton from 'components/atoms/teachers/RoundButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Button />', () => {
  const tree = renderer.create(<RoundButton text="女性" />).toJSON()
  expect(tree).toMatchSnapshot()
})
