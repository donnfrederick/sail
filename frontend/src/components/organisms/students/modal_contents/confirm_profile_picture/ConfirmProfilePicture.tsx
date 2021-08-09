import * as React from 'react'
import styled from 'styled-components'

import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/students/Button'
import { Info } from 'models/students'
import resolvePath from 'utils/resolvePath'

interface Props {
  info: Info
  close(): void
  onConfirm(): void
}

export default (props: Props) => {
  const { info, close, onConfirm } = props

  const handleClick = () => {
    close()
    onConfirm()
  }

  return (
    <Container>
      <RoundImage
        key={info.picture}
        src={info.picture || resolvePath.image('common/user.png')}
        size={size}
        marginBottom={62}
        code={info.country}
      />
      <ConfirmationText>
        Are you sure this is your face ? It should be your face photo for better
        communication with Japanese. Otherwise, please press "back" button to
        change your upload.
      </ConfirmationText>
      <ButtonContainer>
        <Button type="white" width={250} text="Back" onClick={() => close()} />
        <Button type="blue" width={250} text="OK" onClick={handleClick} />
      </ButtonContainer>
    </Container>
  )
}

const size: number = 240

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ConfirmationText = styled.div`
  font-size: 30px;
  line-height: 1.5;
  margin-bottom: 62px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`
