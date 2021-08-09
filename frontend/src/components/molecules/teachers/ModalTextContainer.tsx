import ModalHeading from 'components/atoms/teachers/ModalHeading'
import ModalText from 'components/atoms/teachers/ModalText'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  heading: string
  isError?: boolean
  text?: string
  textAlign?: 'center' | 'left'
}

export default (props: Props) => {
  const { heading, isError, text, textAlign = 'center' } = props

  return (
    <TextContainer>
      <ModalHeading isError={isError} text={heading} />
      {text ? <ModalText text={text} textAlign={textAlign} /> : null}
    </TextContainer>
  )
}

const TextContainer = styled.div`
  margin-bottom: 80px;
  white-space: pre-wrap;
`
