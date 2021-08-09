import ReportReason from 'components/molecules/evaluation/ReportReason'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ReportReason />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(8)
    const reportReasonState = React.useState<number[]>([])
    return (
      <ReportReason
        reportReasonState={reportReasonState}
        isTeacher={isTeacher}
        stepState={stepState}
      />
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
