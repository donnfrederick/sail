import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <ModalTextContainer
        heading={'ERROR'}
        text={'Your microphone is not working.'}
        isError={true}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="Try Again"
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
