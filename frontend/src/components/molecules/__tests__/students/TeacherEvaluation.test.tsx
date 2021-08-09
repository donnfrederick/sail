import TeacherEvaluation from 'components/molecules/students/TeacherEvaluation'
import { evaluations } from 'mocks/sampleData/evaluations'
import { userProfile } from 'mocks/sampleData/userProfile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <TeacherEvaluation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <TeacherEvaluation
          evaluations={evaluations}
          user={userProfile}
          type="basic"
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
