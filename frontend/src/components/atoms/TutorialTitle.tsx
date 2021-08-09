import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

export default (props: Props) => {
  const { text } = props

  return <TutorialTitle>{text}</TutorialTitle>
}

const TutorialTitle = styled.div`
  width: 600px;
  font-size: 40px;
  font-weight: bold;
  margin-left: -10px;
  text-align: center;
`
