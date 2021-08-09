import * as React from 'react'

import Checkbox from 'components/atoms/evaluation/Checkbox'
import HeaderText from 'components/atoms/evaluation/HeaderText'
import {
  FooterContainer,
  Header,
  MainContentContainer
} from 'components/atoms/evaluation/styledElements'
import Memo from 'components/atoms/Memo'
import SubmitButton from 'components/molecules/evaluation/SubmitButton'
import { ComponentProps, headerTexts, StateHook } from 'models/evaluations'

interface Props extends ComponentProps {
  reportDetailState: StateHook<string>
  isAlreadyBlocked: boolean
  blockState: StateHook<boolean>
}

export default ({
  reportDetailState,
  isAlreadyBlocked,
  blockState,
  stepState,
  isTeacher
}: Props) => {
  const [step, setStep] = stepState
  const [reportDetail, setReportDetail] = reportDetailState
  const [block, setBlock] = blockState
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReportDetail(event.target.value)
  const onClick = () => setBlock(!block)
  const onButtonClick = () => setStep(step + 1)

  const text = isTeacher ? texts.teachers : texts.students
  const headerText = isTeacher ? headerTexts.teacher : headerTexts.student

  return (
    <>
      <Header paddingTop={isTeacher ? 80 : 0}>
        <HeaderText texts={headerText[step]} />
      </Header>
      <MainContentContainer marginTop={110}>
        <Memo onChange={onChange} value={reportDetail} />
        {!isAlreadyBlocked ? (
          <Checkbox
            onSelect={onClick}
            onUnselect={onClick}
            text={text.blockPrompt}
            isActive={block}
          />
        ) : null}
      </MainContentContainer>
      <FooterContainer>
        <SubmitButton
          onClick={onButtonClick}
          text={text.button}
          isActive={!!reportDetail.length}
        />
      </FooterContainer>
    </>
  )
}

const texts = {
  students: {
    blockPrompt: 'Block this person?',
    button: 'Confirm Report'
  },
  teachers: {
    blockPrompt: 'このユーザーをブロックしますか？',
    button: '報告内容の確認'
  }
}
