import ConversationButtons from 'components/molecules/students/ConversationButtons'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Stars />', () => {
  const tree = renderer
    .create(
      <Intl>
        <ConversationButtons
          conversationMode={'video'}
          isChatOpen={true}
          openChat={() => null}
          closeEvent={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
