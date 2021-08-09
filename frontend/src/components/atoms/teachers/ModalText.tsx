import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  textAlign?: 'center' | 'left'
}

export default (props: Props) => {
  const { text, textAlign = 'center' } = props

  return <Text textAlign={textAlign}>{text}</Text>
}

const Text = styled<{ textAlign?: string }, any>('p')`
  margin-bottom: 64px;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  white-space: pre-wrap;
  color: #405766;
`
