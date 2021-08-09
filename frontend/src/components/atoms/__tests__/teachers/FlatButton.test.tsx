import FlatButton from 'components/atoms/teachers/FlatButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FlatButton />', () => {
  const tree = renderer
    .create(<FlatButton text="日本語を教えたい" isSelected={false} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
