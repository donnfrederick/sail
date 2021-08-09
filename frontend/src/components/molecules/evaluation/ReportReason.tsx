import * as React from 'react'

import Checkbox from 'components/atoms/evaluation/Checkbox'
import questionnaireHoc from 'components/molecules/evaluation/questionnaireHoc'
import {
  ComponentProps,
  QuestionnaireChoice,
  reportReasonChoices,
  StateHook
} from 'models/evaluations'

interface Props extends ComponentProps {
  reportReasonState: StateHook<number[]>
}

export default ({ reportReasonState, stepState, isTeacher }: Props) => {
  const [reportReason, setReportReason] = reportReasonState
  const onSelect = (choice: number) =>
    setReportReason([...reportReason, choice])
  const onUnselect = (choice: number) =>
    setReportReason(reportReason.filter(i => i !== choice))
  const reportReasonChoice = isTeacher
    ? reportReasonChoices.teacher
    : reportReasonChoices.student
  const ReportReason = () => (
    <>
      {reportReasonChoice.map((choice: QuestionnaireChoice) => (
        <Checkbox
          key={choice.value}
          text={choice.text}
          isActive={reportReason.includes(choice.value)}
          onSelect={() => onSelect(choice.value)}
          onUnselect={() => onUnselect(choice.value)}
        />
      ))}
    </>
  )
  const isActive = !!reportReason.length
  const QuestionnaireEl = questionnaireHoc(ReportReason)
  return (
    <QuestionnaireEl
      stepState={stepState}
      isActive={isActive}
      subHeaderAlign="left"
      isTeacher={isTeacher}
    />
  )
}
