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
        heading={'無断欠席しました'}
        text={
          '前回の会話で無断欠席しました。\n次回は必ず出席しましょう。\n\n次回も無断欠席をすると\nペナルティが発生します。'
        }
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
