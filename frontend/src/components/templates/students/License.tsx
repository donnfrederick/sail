import SupportHeading from 'components/atoms/students/SupportHeading'
import SupportParagraph from 'components/atoms/students/SupportParagraph'
import Header from 'components/organisms/students/header'
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
        <div key={content.heading}>
          <SupportHeading text={content.heading} />
          <SupportParagraph text={content.text} />
        </div>
      ))}
      <Header text="License" hasBackButton={true} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 152px 64px;
  text-align: center;
`
