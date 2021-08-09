import Button from 'components/atoms/teachers/Button'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Button />', () => {
  const tree = renderer
    .create(
      <Button
        type="white"
        text="button"
        onClick={() => console.log('button clicked')}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
