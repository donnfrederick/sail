import * as React from 'react'

import HeaderText from 'components/atoms/evaluation/HeaderText'
import {
  FooterContainer,
  Header
} from 'components/atoms/evaluation/styledElements'
import LinkText from 'components/atoms/LinkText'
import SubmitButton from 'components/molecules/evaluation/SubmitButton'
import { ComponentProps, EvaluationType, headerTexts } from 'models/evaluations'
import resolvePath from 'utils/resolvePath'

interface Props extends ComponentProps {
  type: EvaluationType
}

export default ({ stepState, type, isTeacher }: Props) => {
  const [step, setStep] = stepState

  const text = isTeacher ? texts.teachers : texts.students
  const headerText = isTeacher ? headerTexts.teacher : headerTexts.student
  const userType = isTeacher ? 'teachers' : 'students'
  // 途中会話終了と普通会話終了のパータン
  const subHeader =
    type === 'completed'
      ? headerText[step][1]
          .split('\n')
          .slice(1)
          .join('\n')
      : headerText[step][1]
  const header = [headerText[step][0], subHeader]
  return (
    <>
      <Header paddingTop={300}>
        <HeaderText texts={header} />
      </Header>
      <FooterContainer>
        <SubmitButton
          onClick={() => setStep(step + 1)}
          text={text.button}
          type="white"
          marginBottom={25}
        />
        <LinkText
          type="white"
          to={resolvePath.page(userType, 'mypage')}
          text={text.exit}
        />
      </FooterContainer>
    </>
  )
}

const texts = {
  students: {
    button: 'Continue',
    exit: 'Rate later'
  },
  teachers: {
    button: '評価へ進む',
    exit: '後で評価する'
  }
}
