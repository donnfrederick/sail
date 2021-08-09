import * as React from 'react'
import styled from 'styled-components'
import content, { Url } from 'utils/supportParagraphContent'

interface Props {
  text: string
  urls?: Url[]
}

export default (props: Props) => {
  const { text, urls } = props
  return <Container>{content(text, urls)}</Container>
}

const Container = styled.p`
  margin: 0 0 40px;
  padding: 0;
  font-size: 27px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: left;
  white-space: pre-wrap;
  color: #405766;
`
