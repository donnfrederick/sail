import TutorialContent from 'components/atoms/TutorialContent'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <TutorialContent />', () => {
  const tree = renderer
    .create(
      <Intl>
        <TutorialContent text="Content" />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
