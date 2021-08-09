import * as React from 'react'
import styled from 'styled-components'

import Checkbox from 'components/atoms/evaluation/Checkbox'
import HeaderText from 'components/atoms/evaluation/HeaderText'
import {
  FooterContainer,
  Header,
  MainContentContainer
} from 'components/atoms/evaluation/styledElements'
import SubmitButton from 'components/molecules/evaluation/SubmitButton'
import { ComponentProps, headerTexts, StateHook } from 'models/evaluations'
import resolvePath from 'utils/resolvePath'

interface Props extends ComponentProps {
  favoriteState: StateHook<boolean>
  isAlreadyFavorite: boolean
  onSubmit: () => void
}

export default ({
  favoriteState,
  isTeacher,
  isAlreadyFavorite,
  onSubmit,
  stepState
}: Props) => {
  const [step, setStep] = stepState
  const [favorite, setFavorite] = favoriteState
  const onClick = () => setFavorite(!favorite)
  const onExitButtonClick = () => {
    if (onSubmit && favorite) {
      onSubmit()
    }
  }
  const onReportButtonClick = () => {
    if (onSubmit && favorite) {
      onSubmit()
    }
    setStep(step + 1)
  }

  const text = isTeacher ? texts.teachers : texts.students
  const headerText = isTeacher ? headerTexts.teacher : headerTexts.student

  // subheader (what is 'favorite'?・お気に入りとは?) を抜ける
  const header = isAlreadyFavorite
    ? headerText[step].splice(0, 1)
    : headerText[step]

  return (
    <>
      <Header paddingTop={isTeacher ? 80 : 0}>
        <HeaderText texts={header} />
      </Header>
      <MainContentContainer width={570} marginTop={0}>
        {!isAlreadyFavorite ? (
          <>
            <Text fontSize={28}>{text.favoriteDesc}</Text>
            <Checkbox
              isCenter={true}
              onSelect={onClick}
              onUnselect={onClick}
              isActive={favorite}
              text={text.favoriteCheckbox}
            />
          </>
        ) : null}
        <CenterButtonWrapper>
          <SubmitButton
            onClick={onExitButtonClick}
            text={text.backButton}
            link={resolvePath.page(
              isTeacher ? 'teachers' : 'students',
              'mypage'
            )}
          />
        </CenterButtonWrapper>
      </MainContentContainer>

      <FooterContainer>
        <Hr />
        <HeaderText
          texts={[text.issueHeader, text.issueSubheader]}
          headerFontSize={36}
          subHeaderFontSize={28}
          subHeaderAlign="left"
          marginBottom={40}
        />
        <SubmitButton
          onClick={onReportButtonClick}
          type="white"
          text={text.issueButton}
          width={250}
          height={50}
          fontSize={24}
          marginBottom={0}
        />
      </FooterContainer>
    </>
  )
}

const texts = {
  students: {
    backButton: 'Back to Home',
    favoriteCheckbox: 'Add this person to "Favorite"',
    favoriteDesc:
      "'Favorite' information is used to improve the conversation matching system.",
    issueButton: 'Report',
    issueHeader: 'Report Issue',
    issueSubheader:
      'Was there any issue with your conversation partner? You can report the issue and/or block the user.'
  },
  teachers: {
    backButton: 'ホームに戻る',
    favoriteCheckbox: 'この方をお気入りにする',
    favoriteDesc: 'お気に入り情報は、マッチング精度の改善に活用しています。',
    issueButton: '問題を報告する',
    issueHeader: '会話相手に問題はありましたか？',
    issueSubheader:
      '問題があった場合ユーザーをブロックしたり、運営に通報できます。'
  }
}

const Hr = styled.hr`
  color: black;
  width: 100%;
  margin-bottom: 40.5px;
`

const CenterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Text = styled<{ fontSize?: number }, any>('p')`
  padding: 0;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 26)}px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0px;
  text-align: center;
  white-space: pre-wrap;
`
