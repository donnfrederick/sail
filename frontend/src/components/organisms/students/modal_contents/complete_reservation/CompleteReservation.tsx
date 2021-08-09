import Button from 'components/atoms/students/Button'
import ModalReservedDate from 'components/atoms/teachers/ModalReservedDate'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import { getModalDate, getModalTime } from 'utils/getFormattedTime'
import resolvePath from 'utils/resolvePath'

interface Props {
  reservedConversation: ConversationModels.Conversation | null
  type: ConversationModels.ReservationType
  close(): void
}

export default (props: Props) => {
  const { reservedConversation, type, close } = props
  const heading =
    type === 'request'
      ? 'Now you made the request!'
      : 'Reservation is completed!'
  const text =
    type === 'request'
      ? 'Please wait until the request is accepted.'
      : 'Please participate on time.'

  return (
    <Container>
      <ModalTextContainer heading={heading} text={text} />
      <ModalReservedDate
        date={
          reservedConversation
            ? getModalDate(reservedConversation.start_at, 'en')
            : ''
        }
        time={
          reservedConversation
            ? getModalTime(
                reservedConversation.start_at,
                reservedConversation.end_at,
                'en'
              )
            : ''
        }
        marginBottom={116}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="OK"
          width={430}
          height={88}
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
