import Button from 'components/atoms/teachers/Button'
import SupportHeading from 'components/atoms/teachers/SupportHeading'
import SupportParagraph from 'components/atoms/teachers/SupportParagraph'
import Header from 'components/molecules/teachers/Header'
import { history } from 'components/organisms/Router'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      {contents.map(content => (
        <div key={content.text}>
          <SupportHeading text={content.heading} />
          <SupportParagraph text={content.text} />
        </div>
      ))}
      <Button
        type="white"
        text="戻る"
        width={344}
        height={112}
        onClick={() => history.goBack()}
      />
      <Header text="運営会社について" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 184px 80px;
  text-align: center;
`

const contents = [
  {
    heading: '社名',
    text: '株式会社Helte'
  },
  {
    heading: 'コーポレートサイト',
    text: 'https://www.helte.jp/'
  },
  {
    heading: '本社所在地',
    text: '〒277-0011 千葉県柏市東上町2-28 第一水戸屋ビル3F Noblesses Oblige内'
  },
  {
    heading: 'お問い合わせ',
    text: '050-3358-6892'
  },
  {
    heading: 'サービス内容',
    text: '教育・福祉のためのオンラインビデオチャット会話サービス'
  }
]
