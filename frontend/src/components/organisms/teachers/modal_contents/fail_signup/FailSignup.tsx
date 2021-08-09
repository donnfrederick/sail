import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  error: any
  close(): void
}

export default (props: Props) => {
  const { error, close } = props

  return (
    <Container>
      <ModalTextContainer
        heading={'新規登録に失敗しました'}
        text={error ? error.response.data.error.message.join('\n') : ''}
        isError={true}
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
