import BlockMemo from 'components/atoms/teachers/user_profile/BlockMemo'
import { evaluations } from 'mocks/sampleData/evaluations'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <BlockMemo />', () => {
  const tree = renderer
    .create(<BlockMemo reports={evaluations.reports} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
