import * as React from 'react'
import styled from 'styled-components'

import content, { Url } from 'utils/supportParagraphContent'

interface Props {
  text: string
  urls?: Url[]
}

export default (props: Props) => {
  const { text, urls } = props
  return <Paragraph>{content(text, urls)}</Paragraph>
}

const Paragraph = styled.p`
  margin: 0 0 128px;
  padding: 0;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: left;
  white-space: pre-wrap;
  color: #405766;
`
