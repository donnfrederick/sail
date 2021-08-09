import * as React from 'react'

import HeaderText from 'components/atoms/evaluation/HeaderText'
import {
  FooterContainer,
  Header,
  MainContentContainer
} from 'components/atoms/evaluation/styledElements'
import StudentSteps from 'components/atoms/students/Steps'
import TeacherSteps from 'components/atoms/teachers/Steps'
import SubmitButton from 'components/molecules/evaluation/SubmitButton'
import { headerTexts, StateHook } from 'models/evaluations'

export default (QuestionnaireElement: React.FunctionComponent) => ({
  stepState,
  isActive,
  headerWidth,
  subHeaderAlign,
  isTeacher,
  onSubmit
}: {
  subHeaderAlign?: 'left' | 'center'
  headerWidth?: number
  stepState: StateHook<number>
  isActive: boolean
  isTeacher: boolean
  onSubmit?: () => void
}) => {
  const [step, setStep] = stepState
  const stepCount = isTeacher ? 4 : 3
  const isQuestionnaire = step <= stepCount
  const isLastQuestionnaire = step === stepCount
  const onClick = () => {
    if (onSubmit) {
      onSubmit()
    }
    setStep(step + 1)
  }

  const Steps = isTeacher ? TeacherSteps : StudentSteps
  const text = isTeacher ? texts.teachers : texts.students
  const headerText = isTeacher ? headerTexts.teacher : headerTexts.student
  const headerPaddingTop = isTeacher ? (isQuestionnaire ? 0 : 80) : 0

  return (
    <>
      <Header paddingTop={headerPaddingTop}>
        {isQuestionnaire && <Steps currentStep={step} stepCount={stepCount} />}
        <HeaderText
          texts={headerText[step]}
          width={headerWidth}
          subHeaderAlign={subHeaderAlign}
        />
      </Header>
      <MainContentContainer marginTop={isLastQuestionnaire ? 25 : 100}>
        <QuestionnaireElement />
      </MainContentContainer>
      <FooterContainer>
        <SubmitButton
          onClick={onClick}
          isActive={isActive}
          text={isLastQuestionnaire ? text.buttonFinish : text.buttonNext}
        />
      </FooterContainer>
    </>
  )
}

const texts = {
  students: {
    buttonFinish: 'Finish',
    buttonNext: 'Next'
  },
  teachers: {
    buttonFinish: '終わり',
    buttonNext: '次へ'
  }
}
