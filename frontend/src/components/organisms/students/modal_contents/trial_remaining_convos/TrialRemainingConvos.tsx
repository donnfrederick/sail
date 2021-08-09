import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  num_convos: number | null
  token: string
  page: string
  close(): void
}

export default (props: Props) => {
  const { token, page, close, num_convos } = props

  const header =
    num_convos !== null
      ? `You have ${num_convos} conversation(s) left in your trial.`
      : 'Please check your subscription status.'

  return (
    <Container>
      <ModalTextContainer heading={header} />
      <ButtonContainer>
        <Button
          type="blue"
          text="Upgrade"
          width={244}
          height={88}
          fontSize={32}
          onClick={() =>
            (window.location.href =
              '/billing/students/payment_methods/' + token)
          }
        />
        {page === 'mypage' || page === 'reservations' ? (
          <Button
            type="white"
            text="Close"
            width={244}
            height={88}
            fontSize={32}
            onClick={() => close()}
          />
        ) : null}
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
  justify-content: space-around;
  width: 100%;
  margin-top: 72px;
`
