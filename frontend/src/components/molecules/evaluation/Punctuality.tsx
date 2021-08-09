import * as React from 'react'

import RadioButton from 'components/atoms/evaluation/RadioButton'
import questionnaireHoc from 'components/molecules/evaluation/questionnaireHoc'
import {
  ComponentProps,
  punctualityChoices,
  QuestionnaireChoice,
  StateHook,
  TimeUnion
} from 'models/evaluations'

interface Props extends ComponentProps {
  punctualityState: StateHook<number>
}

export default ({ punctualityState, stepState, isTeacher }: Props) => {
  const [punctuality, setPunctuality] = punctualityState
  const onClick = (choice: TimeUnion) => setPunctuality(choice)
  const punctualityChoice = isTeacher
    ? punctualityChoices.teacher
    : punctualityChoices.student
  const PunctualityChoice = () => (
    <>
      {punctualityChoice.map((choice: QuestionnaireChoice<TimeUnion>) => (
        <RadioButton
          key={choice.value}
          text={choice.text}
          isActive={punctuality === choice.value}
          onClick={() => onClick(choice.value)}
        />
      ))}
    </>
  )
  const isActive = !!punctuality
  const QuestionnaireEl = questionnaireHoc(PunctualityChoice)
  return (
    <QuestionnaireEl
      stepState={stepState}
      isActive={isActive}
      isTeacher={isTeacher}
    />
  )
}
