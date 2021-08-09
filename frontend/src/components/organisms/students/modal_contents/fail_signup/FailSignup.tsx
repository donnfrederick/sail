import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  error: any
}

export default (props: Props) => {
  const { error } = props

  return (
    <Container>
      <ModalTextContainer
        heading={'Failed to Sign up'}
        text={
          error
            ? error.response.data.error.message.join('\n')
            : 'Please try again'
        }
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="Close"
          onClick={() => window.location.reload()}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
