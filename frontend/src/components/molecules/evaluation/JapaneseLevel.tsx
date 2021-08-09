import * as React from 'react'

import RadioButton from 'components/atoms/evaluation/RadioButton'
import questionnaireHoc from 'components/molecules/evaluation/questionnaireHoc'
import {
  AbilityUnion,
  ComponentProps,
  japaneseLevelChoices,
  QuestionnaireChoice,
  StateHook
} from 'models/evaluations'

interface Props extends ComponentProps {
  japaneseLevelState: StateHook<number>
}

export default ({ japaneseLevelState, stepState }: Props) => {
  const [japaneseLevel, setJapaneseLevel] = japaneseLevelState
  const onClick = (choice: AbilityUnion) => setJapaneseLevel(choice)
  const JapaneseLevelQuestionnaire = () => (
    <>
      {japaneseLevelChoices.map((choice: QuestionnaireChoice<AbilityUnion>) => (
        <RadioButton
          key={choice.value}
          text={choice.text}
          isActive={japaneseLevel === choice.value}
          onClick={() => onClick(choice.value)}
        />
      ))}
    </>
  )
  const isActive = !!japaneseLevel
  const QuestionnaireEl = questionnaireHoc(JapaneseLevelQuestionnaire)
  return (
    <QuestionnaireEl
      stepState={stepState}
      isActive={isActive}
      isTeacher={true}
    />
  )
}
