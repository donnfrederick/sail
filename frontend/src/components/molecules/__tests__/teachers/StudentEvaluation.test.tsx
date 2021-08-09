import StudentEvaluation from 'components/molecules/teachers/StudentEvaluation'
import { evaluations } from 'mocks/sampleData/evaluations'
import { userProfile } from 'mocks/sampleData/userProfile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <StudentEvaluation />', () => {
  const tree = renderer
    .create(
      <StudentEvaluation
        evaluations={evaluations}
        user={userProfile}
        type="basic"
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
