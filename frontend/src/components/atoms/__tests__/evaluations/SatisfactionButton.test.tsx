import SatisfactionButton from 'components/atoms/evaluation/SatisfactionButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SatisfactionButton />', () => {
  const emojiName = 'smiley_flat'
  const tree = renderer
    .create(
      <SatisfactionButton
        text="とても楽しかった！"
        emojiName={emojiName}
        isActive={true}
        onClick={() => console.log('clicked')}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
