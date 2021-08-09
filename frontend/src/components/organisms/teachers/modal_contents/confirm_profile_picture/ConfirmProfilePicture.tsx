import * as React from 'react'
import styled from 'styled-components'

import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import { Info } from 'models/teachers'
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
        code="JA"
      />
      <ConfirmationText>
        登録するのは顔写真ですか？
        はっきりと顔が分からなければ、会話相手が安心しません。
        顔写真以外を登録しようしている方は、戻って写真を変更してください。
      </ConfirmationText>
      <ButtonContainer>
        <Button type="white" width={250} text="戻る" onClick={close} />
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
