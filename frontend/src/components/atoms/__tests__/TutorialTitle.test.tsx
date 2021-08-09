import TutorialTitle from 'components/atoms/TutorialTitle'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <TutorialTitle />', () => {
  const tree = renderer
    .create(
      <Intl>
        <TutorialTitle text="Title" />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
