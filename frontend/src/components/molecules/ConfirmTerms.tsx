import ConfirmTermsHeading from 'components/atoms/ConfirmTermsHeading'
import ConfirmTermsParagraph from 'components/atoms/ConfirmTermsParagraph'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  contents: {
    introduction: { heading: string; text: string }
    operative_part: { heading: string; text: string }
    established: { text: string }
    articles: any
  }
}

export default (props: Props) => {
  const { contents } = props
  return (
    <Container>
      <ConfirmTermsHeading text={contents.introduction.heading} />
      <ConfirmTermsParagraph text={contents.introduction.text} />
      <TermContents>
        <ConfirmTermsHeading text={contents.operative_part.heading} />
        <ConfirmTermsParagraph text={contents.operative_part.text} />
        {contents.articles.map((content: { heading: string; text: string }) => {
          return (
            <div key={content.heading}>
              <ConfirmTermsHeading text={content.heading} />
              <ConfirmTermsParagraph text={content.text} />
            </div>
          )
        })}
        <ConfirmTermsParagraph text={contents.established.text} />
      </TermContents>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 30px;
  text-align: center;
`

const TermContents = styled.div`
  margin-top: 40px;
`
