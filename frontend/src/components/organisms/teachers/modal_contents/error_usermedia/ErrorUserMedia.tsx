import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <ModalTextContainer
        heading={'エラー'}
        text={'マイクが動作しておりません'}
        isError={true}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="もう一度試す"
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
