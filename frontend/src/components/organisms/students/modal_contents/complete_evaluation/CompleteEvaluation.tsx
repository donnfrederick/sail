import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  close(): void
}
export default (props: Props) => {
  const { close } = props

  return (
    <Container>
      <ModalTextContainer heading={'Thank you for using Sail'} />
      <ButtonContainer>
        <Button
          type="blue"
          text="OK"
          link={resolvePath.page('students', 'mypage')}
          onClick={() => close()}
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
