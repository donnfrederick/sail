import * as React from 'react'
import * as renderer from 'react-test-renderer'
import ConfirmTerms from 'components/molecules/ConfirmTerms'
import { Intl } from 'components/organisms/Intl'
import teacher_contents from 'terms/teachers_terms.json'
import student_contents from 'terms/students_terms.json'

test('render <ConfirmTerms /> for teacher', () => {
  const tree = renderer.create(
    <Intl>
      <ConfirmTerms contents={teacher_contents} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render <ConfirmTerms /> for student', () => {
  const tree = renderer.create(
    <Intl>
      <ConfirmTerms contents={student_contents} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
