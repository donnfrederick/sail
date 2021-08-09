import Topics from 'components/molecules/Topics'
import * as sampleData from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Topics />', () => {
  const tree = renderer.create(
    <Intl>
      <Topics topics={sampleData.topics} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
