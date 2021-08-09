import * as React from 'react'

import Checkbox from 'components/atoms/evaluation/Checkbox'
import questionnaireHoc from 'components/molecules/evaluation/questionnaireHoc'
import {
  chatQualityChoices,
  ComponentProps,
  QualityUnion,
  QuestionnaireChoice,
  StateHook
} from 'models/evaluations'

interface Props extends ComponentProps {
  chatQualityState: StateHook<number[]>
  onSubmit: () => void
}

export default ({
  chatQualityState,
  stepState,
  isTeacher,
  onSubmit
}: Props) => {
  const [chatQuality, setChatQuality] = chatQualityState
  const onSelect = (choice: QualityUnion) =>
    setChatQuality([...chatQuality, choice])
  const onUnselect = (choice: QualityUnion) =>
    setChatQuality(chatQuality.filter(i => i !== choice))
  const chatQualityChoice = isTeacher
    ? chatQualityChoices.teacher
    : chatQualityChoices.student
  const ChatQuality = () => (
    <>
      {chatQualityChoice.map((choice: QuestionnaireChoice<QualityUnion>) => (
        <Checkbox
          key={choice.value}
          text={choice.text}
          isActive={chatQuality.includes(choice.value)}
          onSelect={() => onSelect(choice.value)}
          onUnselect={() => onUnselect(choice.value)}
        />
      ))}
    </>
  )
  const QuestionnaireEl = questionnaireHoc(ChatQuality)
  return (
    <QuestionnaireEl
      stepState={stepState}
      isActive={true}
      headerWidth={640}
      subHeaderAlign="left"
      isTeacher={isTeacher}
      onSubmit={onSubmit}
    />
  )
}
