import styled, { css } from 'styled-components'
import React, { useState } from 'react'
import resolvePath from 'utils/resolvePath'
import * as checkUrl from 'utils/checkUrl'
import Steps from 'components/molecules/CircleSteps'
import TutorialModalContainer from 'components/molecules/TutorialModalContainer'

interface Props {
  close(): void
}

export default (props: Props) => {
  const { close } = props
  const [currentStep, setCurrentStep] = useState<number>(1)
  const contents = checkUrl.isTeachers() ? teacherContents : studentContents

  return (
    <Modal>
      <CardContainer>
        {contents.map(content => {
          return currentStep !== content.step ? null : (
            <TutorialModalContainer
              img={content.img}
              text={content.text}
              title={content.title}
            />
          )
        })}
        {currentStep > 1 ? (
          <LeftSlideButton>
            <SlideImg
              src={resolvePath.image(
                'common/tutorial_register/left_arrow_01.png'
              )}
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1)
                }
              }}
            />
          </LeftSlideButton>
        ) : null}
        {currentStep < totalStep ? (
          <RightSlideButton>
            <SlideImg
              src={resolvePath.image(
                'common/tutorial_register/right_arrow_01.png'
              )}
              onClick={() => {
                if (currentStep < totalStep) {
                  setCurrentStep(currentStep + 1)
                }
              }}
            />
          </RightSlideButton>
        ) : null}
        <Steps currentStep={currentStep} stepCount={totalStep} />
      </CardContainer>
      <ButtonContainer>
        <Button
          onClick={() => {
            if (currentStep === totalStep) {
              checkUrl.isStudents()
                ? localStorage.setItem('showTutorial', 'end')
                : localStorage.setItem('showTutorial', 'start')
              close()
            } else if (currentStep < totalStep) {
              setCurrentStep(currentStep + 1)
            }
          }}
        >
          <TextWrap>
            {currentStep >= totalStep ? texts.complete : texts.next}
          </TextWrap>
        </Button>
      </ButtonContainer>
    </Modal>
  )
}

const totalStep: number = checkUrl.isTeachers() ? 5 : 4
const texts = checkUrl.isTeachers()
  ? { complete: '完了', next: '次へ' }
  : { complete: 'Complete', next: 'Next' }

const CardContainer = styled.div`
  width: 10px;
  height: 500px;
`

const SlideImg = styled.img`
  width: 100px;
  margin-top: 40px;
`
const LeftSlideButton = styled.div`
  appearance: none;
  width: 100px;
  height: 80px;
  bottom: 480px;
  position: absolute;
  left: auto;
  margin-left: -70px;
`
const RightSlideButton = styled.div`
  appearance: none;
  width: 100px;
  height: 80px;
  bottom: 700px;
  position: absolute;
  bottom: 480px;
  margin-left: 530px;
`
const ButtonContainer = styled.div`
  position: inherit;
  width: 100%;
  text-align: center;
  top: 360px;
  margin-left: auto;
  line-height: inherit;
  color: #405766 !important;
`
const Button = styled.div`
  appearance: none;
  width: 500px;
  height: 70px;
  margin-left: 25px;
  padding: 0px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-image: blue;
  background-color: #2686ef;
  box-shadow: 0 2px 20px -6px rgb(5 68 102 / 43%);
  border: 4px solid #138efd;
  font-size: 32px;
  font-weight: 200;
  line-height: 40px;
  text-align: center;
  color: #e7e9eb;
}
`
const textWrapStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: inherit;
  white-space: pre-wrap;
  line-height: 1.3;
`
const TextWrap = styled.div`
  ${textWrapStyle};
`
const Modal = styled.div`
  position: relative;
  width: 672px;
  height: 900px;
  box-sizing: border-box !important;
  padding: auto;
  margin-left: 10px;
`

const teacherContents = [
  {
    img: resolvePath.image('common/tutorial_register/Japan01.png'),
    step: 1,
    text:
      'Sailで25分間の気軽な旅に出ませんか？世界中の日本ファンと日本語でつながり、様々な国の生活、文化、歴史を知り、お互いの経験や考えを交換しましょう。',
    title: 'Sailで25分間の世界旅行へ！'
  },
  {
    img: resolvePath.image('common/tutorial_register/Japan02.png'),
    step: 2,
    text:
      'プロフィール写真は笑顔の写真に、自己紹介文はひらがなを多めにして書くと、世界Sailerとのマッチングがスムーズになります。',
    title: 'プロフィールの内容を充実させましょう'
  },
  {
    img: resolvePath.image('common/tutorial_register/Japan03.png'),
    step: 3,
    text:
      '会話したい日、時間を選ぶところから、Sailの異文化交流は始まります。25分間の気軽な旅を、『予約する』ボタンからはじめましょう。',
    title: '予約ボタンから会話したい日を選びましょう'
  },
  {
    img: resolvePath.image('common/tutorial_register/Japan04.png'),
    step: 4,
    text:
      '日本のみなさんが予約した日時を"世界Sailer"が見て予約を入れると、マッチングが成立、会話予約が確定します。あとは当日を待つだけです。',
    title: '"世界Sailer"から会話の予約が入ると、予約確定です'
  },
  {
    img: resolvePath.image('common/tutorial_register/Japan05.png'),
    step: 5,
    text:
      '会話時間になったらSailを開き、自動で出てくる『会話する』ボタンを押して会話に参加します。他のビデオチャットサービスを使用する必要はありません。',
    title: 'ビデオ会話はSailのアプリ上でできます'
  }
]

const studentContents = [
  {
    img: resolvePath.image('common/tutorial_register/World01.png'),
    step: 1,
    text:
      'Sailで25分間の日本旅行へ行こう！日本語で、日本の人に日本のことを聞き、自分の国について話してみましょう。日本のみなさんは、あなたとお話できることを楽しみにしています。',
    title: '3回無料で会話ができます。一回目を予約しましょう！'
  },
  {
    img: resolvePath.image('common/tutorial_register/World02.png'),
    step: 2,
    text:
      '『Menu』を開き、プロフィールを編集することができます。あなたの笑顔の写真と、自己紹介文を入れると、会話はもっと楽しくなります。インターネットが使える場所で、イヤホンをつけて会話します。',
    title: '会話の準備をしましょう！'
  },
  {
    img: resolvePath.image('common/tutorial_register/World03.png'),
    step: 3,
    text:
      '仕方がない理由で会話ができなくなった時は、早めに予約のキャンセルをしてください。',
    title: '遅刻や欠席はやめてください'
  },
  {
    img: resolvePath.image('common/tutorial_register/World04.png'),
    step: 4,
    text:
      '毎週、無料オンライン交流会「Cafeさくら」があります。CafeさくらはZoomを使います。日本文化や日本語の話を聞くことができます！詳しくはお知らせを確認してください。',
    title: '無料オンライン交流会もあります'
  }
]
