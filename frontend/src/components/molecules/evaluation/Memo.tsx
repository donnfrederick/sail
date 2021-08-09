import HeaderText from 'components/atoms/evaluation/HeaderText'
import {
  FooterContainer,
  Header,
  MainContentContainer
} from 'components/atoms/evaluation/styledElements'
import Memo from 'components/atoms/Memo'
import SubmitButton from 'components/molecules/evaluation/SubmitButton'
import { ComponentProps, headerTexts, StateHook } from 'models/evaluations'
import * as React from 'react'
import styled from 'styled-components'

interface Props extends ComponentProps {
  onSubmit: () => void
  memoState: StateHook<string>
}

export default ({ onSubmit, memoState, stepState, isTeacher }: Props) => {
  const [step, setStep] = stepState
  const [memo, setMemo] = memoState
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value
    if (value.length > 1024) {
      value = value.substring(0, 1024)
    }
    setMemo(value)
  }
  const nextStep = () => setStep(step + 1)
  const onButtonClick = () => {
    onSubmit()
    nextStep()
  }

  const suffix = isTeacher
    ? '(残り' + Math.max(1024 - memo.length, 0).toString() + '文字)'
    : '(' +
      Math.max(1024 - memo.length, 0).toString() +
      ' characters remaining)'
  const text = isTeacher ? texts.teachers : texts.students
  const headerText = isTeacher ? headerTexts.teacher : headerTexts.student

  const texts2 = [headerText[step][0], headerText[step][1] + suffix]

  return (
    <>
      <Header paddingTop={isTeacher ? 80 : 0}>
        <HeaderText texts={texts2} width={620} subHeaderAlign="left" />
      </Header>
      <MainContentContainer marginTop={50}>
        <Memo
          onChange={onChange}
          value={memo.length > 1024 ? memo.substring(0, 1024) : memo}
        />
      </MainContentContainer>
      <FooterContainer>
        <SubmitButton
          onClick={onButtonClick}
          text={text.button}
          isActive={!!memo.length}
        />
        <LinkText onClick={nextStep}>{text.finish}</LinkText>
      </FooterContainer>
    </>
  )
}

const texts = {
  students: {
    button: 'Save',
    finish: 'Finish without saving memo'
  },
  teachers: {
    button: 'メモを残す',
    finish: 'メモを残さずに終了する'
  }
}

export const LinkText = styled.p`
  padding: 0;
  font-size: 26px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0px;
  text-align: center;
  white-space: pre-wrap;
  text-decoration: underline;
  color: '#405766';
  margin: 0;
  & > a {
    color: inherit;
  }
`
