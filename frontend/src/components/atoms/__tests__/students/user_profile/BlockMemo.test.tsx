import BlockMemo from 'components/atoms/students/user_profile/BlockMemo'
import { evaluations } from 'mocks/sampleData/evaluations'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <BlockMemo />', () => {
  const tree = renderer
    .create(
      <Intl>
        <BlockMemo reports={evaluations.reports} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
