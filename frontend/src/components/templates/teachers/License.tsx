import Button from 'components/atoms/teachers/Button'
import SupportHeading from 'components/atoms/teachers/SupportHeading'
import SupportParagraph from 'components/atoms/teachers/SupportParagraph'
import Header from 'components/molecules/teachers/Header'
import { history } from 'components/organisms/Router'
import { license } from 'constants/index'
import * as React from 'react'
import styled from 'styled-components'
import { isAndroid, isIos } from 'utils/isWebView'

export default () => {
  return (
    <Container>
      {(isIos()
        ? license.iosLicense
        : isAndroid()
          ? license.androidLicense
          : []
      ).map(content => (
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
      <Header text="ライセンス" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 120px 80px;
  text-align: center;
`
