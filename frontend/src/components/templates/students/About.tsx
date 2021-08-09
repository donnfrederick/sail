import SupportHeading from 'components/atoms/students/SupportHeading'
import SupportParagraph from 'components/atoms/students/SupportParagraph'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

export default () => {
  return (
    <Container>
      {contents.map(content => (
        <div key={content.heading}>
          <SupportHeading text={content.heading} />
          <SupportParagraph text={content.text} />
        </div>
      ))}
      <FormattedMessage id="templates.About.Header" defaultMessage="About">
        {chunks => <Header text={chunks} hasBackButton={true} />}
      </FormattedMessage>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 152px 64px;
  text-align: center;
`

const contents = [
  {
    heading: `Company`,
    text: `Helte co., ltd`
  },
  {
    heading: `Website`,
    text: `https://www.helte.jp/`
  },
  {
    heading: `Headquarters`,
    text: `Daiichi Suidoshitsu Building 3F Nob+ 2-28 Azumakamicho, Kashiwa, Chiba Prefecture 277-0011`
  },
  {
    heading: `Contact`,
    text: `support@helte-corp.com`
  },
  {
    heading: `Service`,
    text: `Online video chat conversation for education and welfare`
  }
]
