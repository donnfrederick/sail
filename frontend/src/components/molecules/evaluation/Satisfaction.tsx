import * as React from 'react'

import SatisfactionButton from 'components/atoms/evaluation/SatisfactionButton'
import questionnaireHoc from 'components/molecules/evaluation/questionnaireHoc'
import {
  ComponentProps,
  FunUnion,
  SatisfactionChoiceProps,
  satisfactionChoices,
  StateHook
} from 'models/evaluations'

interface Props extends ComponentProps {
  satisfactionState: StateHook<number>
}

export default ({ satisfactionState, stepState, isTeacher }: Props) => {
  const [satisfaction, setSatisfaction] = satisfactionState
  const onClick = (choice: FunUnion) => setSatisfaction(choice)
  const satisfactionChoice = isTeacher
    ? satisfactionChoices.teacher
    : satisfactionChoices.student
  const SatisfactionQuestionnaire = () => (
    <>
      {satisfactionChoice.map((choice: SatisfactionChoiceProps) => {
        const isActive = satisfaction === choice.value
        return (
          <SatisfactionButton
            key={choice.value}
            emojiName={choice.emojiName}
            text={choice.text}
            isActive={isActive}
            onClick={() => onClick(choice.value)}
          />
        )
      })}
    </>
  )
  const isButtonActive = !!satisfaction
  const QuestionnaireEl = questionnaireHoc(SatisfactionQuestionnaire)
  return (
    <QuestionnaireEl
      stepState={stepState}
      isActive={isButtonActive}
      isTeacher={isTeacher}
    />
  )
}
