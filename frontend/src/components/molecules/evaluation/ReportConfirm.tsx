import * as React from 'react'
import styled, { css } from 'styled-components'

import Checklist from 'components/atoms/evaluation/Checklist'
import HeaderText from 'components/atoms/evaluation/HeaderText'
import {
  FooterContainer,
  Header,
  MainContentContainer
} from 'components/atoms/evaluation/styledElements'
import SubmitButton from 'components/molecules/evaluation/SubmitButton'
import * as ConversationModels from 'models/conversation'
import {
  ComponentProps,
  headerTexts,
  QuestionnaireChoice,
  reportReasonChoices,
  StateHook
} from 'models/evaluations'
import resolvePath from 'utils/resolvePath'

interface Props extends ComponentProps {
  blockState: StateHook<boolean>
  isAlreadyBlocked: boolean
  reportReasonState: StateHook<ConversationModels.ReportReasonsUnion[]>
  reportDetailState: StateHook<string>
  onSubmit: () => void
}

export default ({
  blockState,
  isAlreadyBlocked,
  isTeacher,
  onSubmit,
  reportReasonState,
  reportDetailState,
  stepState
}: Props) => {
  const [step] = stepState
  const [reportReason] = reportReasonState
  const [reportDetail] = reportDetailState
  const [block] = blockState

  const reportReasonChoice = isTeacher
    ? reportReasonChoices.teacher
    : reportReasonChoices.student

  const reportReasonText = (reasonValue: number) => {
    const reportReasonItem = reportReasonChoice.find(
      (reason: QuestionnaireChoice) => reason.value === reasonValue
    )
    return reportReasonItem ? reportReasonItem.text : ''
  }

  const text = isTeacher ? texts.teachers : texts.students
  const headerText = isTeacher ? headerTexts.teacher : headerTexts.student

  return (
    <>
      <Header paddingTop={isTeacher ? 80 : 0}>
        <HeaderText texts={headerText[step]} />
      </Header>
      <MainContentContainer marginTop={0} width={570}>
        <SectionContainer>
          <SectionHead>{text.reason}</SectionHead>
          {reportReason.map((reasonValue: number) => (
            <Checklist key={reasonValue} text={reportReasonText(reasonValue)} />
          ))}
        </SectionContainer>
        <SectionContainer>
          <SectionHead>{text.detail}</SectionHead>
          <ReportContent>{reportDetail}</ReportContent>
        </SectionContainer>
        {!isAlreadyBlocked ? (
          <SectionContainer>
            <SectionHead>{text.blockStatus}</SectionHead>
            <BlockContent data-block={block}>
              {block ? text.blockPrompt.block : text.blockPrompt.doNotBlock}
            </BlockContent>
          </SectionContainer>
        ) : null}
      </MainContentContainer>
      <FooterContainer>
        <SubmitButton
          onClick={onSubmit}
          text={text.button}
          isActive={!!reportDetail.length}
          link={resolvePath.page(isTeacher ? 'teachers' : 'students', 'mypage')}
        />
      </FooterContainer>
    </>
  )
}

const texts = {
  students: {
    blockPrompt: {
      block: 'Block this user',
      doNotBlock: 'Do not block this user'
    },
    blockStatus: 'Block status',
    button: 'Report',
    detail: 'Details',
    reason: 'Report Reason'
  },
  teachers: {
    blockPrompt: {
      block: 'このユーザーをブロックする',
      doNotBlock: 'このユーザーをブロックしない'
    },
    blockStatus: 'ブロックの有無',
    button: '報告する',
    detail: '詳細',
    reason: '報告理由'
  }
}

const SectionContainer = styled.div`
  margin-bottom: 40px;
`

const SectionHead = styled.h3`
  font-size: 32px;
  text-align: left;
`

const contentTextStyle = css`
  font-size: 28px;
  text-align: left;
`

const ReportContent = styled.p`
  ${contentTextStyle};
`

const BlockContent = styled.p`
  ${contentTextStyle};
  &[data-block='true'] {
    color: #d85151;
    font-weight: bold;
  }
`
