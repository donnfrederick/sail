import ConversationButton from 'components/atoms/teachers/ConversationButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationButton />', () => {
  const tree = renderer
    .create(
      <div>
        <ConversationButton type="end" text="通話終了" />
        <ConversationButton type="theme" text="話題を決める" />
        <ConversationButton type="mode" text="音声通話" />
      </div>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
