import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  close(): void
}

export default (props: Props) => {
  const { close } = props

  return (
    <Container>
      <ModalTextContainer
        heading={'ログインに失敗しました'}
        text={'もう一度お試しください'}
      />
      <ButtonContainer>
        <Button type="blue" text="とじる" onClick={() => close()} />
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
