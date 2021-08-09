import RadioButton from 'components/atoms/evaluation/RadioButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <RadioButton />', () => {
  const tree = renderer
    .create(
      <RadioButton
        text="スムーズに会話ができた"
        isActive={true}
        onClick={() => console.log('clicked')}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
