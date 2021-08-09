import ModalHeading from 'components/atoms/students/ModalHeading'
import ModalText from 'components/atoms/students/ModalText'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  heading: string
  isError?: boolean
  text?: string
}

export default (props: Props) => {
  const { heading, isError, text } = props

  return (
    <TextContainer>
      <ModalHeading isError={isError} text={heading} />
      {text ? <ModalText text={text} /> : null}
    </TextContainer>
  )
}

const TextContainer = styled.div`
  margin-bottom: 80px;
  white-space: pre-wrap;
`
