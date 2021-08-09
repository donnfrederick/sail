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
        textAlign="left"
        heading={'予約方法は2通り'}
        text={
          '【A: 通常予約】\n1. あなたが会話したい時間を予約\n2. その予約を学生が選択し、確定\n\n【B: リクエスト予約】\n1. あなたが会話したい時間を予約\n2. その予約を見た学生が、あなたにリクエスト\n3. あなたが相手を選んで承認し、確定'
        }
      />
      <ButtonContainer>
        <Button type="blue" text={'とじる'} onClick={close} />
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
