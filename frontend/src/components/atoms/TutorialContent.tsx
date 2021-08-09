import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

export default (props: Props) => {
  const { text } = props

  return <TutorialContent>{text}</TutorialContent>
}

const TutorialContent = styled.div`
  width: 550px;
  font-size: 32px;
  margin-top: auto;
  margin-left: 10px;
  font-weight: 300;
  margin-top: 70px;
`
