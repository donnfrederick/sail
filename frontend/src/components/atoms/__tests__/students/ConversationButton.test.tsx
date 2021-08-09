import ConversationButton from 'components/atoms/students/ConversationButton'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationButton />', () => {
  const tree = renderer
    .create(
      <Intl>
        <div>
          <ConversationButton type="end" />
          <ConversationButton type="theme" />
          <ConversationButton type="mode" />
        </div>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
