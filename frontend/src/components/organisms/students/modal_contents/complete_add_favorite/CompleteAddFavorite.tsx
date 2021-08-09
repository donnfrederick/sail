import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import { history } from 'components/organisms/Router'
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
        heading={'Successfully added to your favorites list!'}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="OK"
          onClick={() => {
            close()
            // 仮
            const regexp = /history/
            const matches = history.location.pathname.match(regexp)
            if (matches) {
              window.location.reload()
            } else {
              history.goBack()
            }
          }}
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
