import ConversationButtons from 'components/molecules/teachers/ConversationButtons'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Stars />', () => {
  const tree = renderer
    .create(
      <ConversationButtons
        conversationMode={'soundOnly'}
        isChatOpen={true}
        openChat={() => null}
        closeEvent={() => null}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
