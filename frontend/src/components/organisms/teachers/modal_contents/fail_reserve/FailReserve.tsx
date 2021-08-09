import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'

interface ReservationFailedErrorData {
  error: {
    message: {
      end_at: string
      start_at: string
      text: string
    }
    status: number
  }
}
interface Props {
  error?: any
  close(): void
}

export default (props: Props) => {
  moment.locale('ja')
  const { error } = props
  const errorData: ReservationFailedErrorData = error.response.data
  const { start_at, end_at } = errorData.error.message
  return (
    <Container>
      <ModalTextContainer
        heading={`${moment(start_at).format('YYYY年M月D日 H:mm')}から${moment(
          end_at
        ).format('H:mm')}までは予約済みです。`}
        text={'別の時間を指定してください。'}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="閉じる"
          onClick={() => {
            window.location.reload()
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
