import Button from 'components/atoms/teachers/Button'
import ModalReservedDate from 'components/atoms/teachers/ModalReservedDate'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import { getModalDate, getModalTime } from 'utils/getFormattedTime'
import resolvePath from 'utils/resolvePath'

interface Props {
  response: ConversationModels.Response | null
  close(): void
}

export default (props: Props) => {
  const { response, close } = props

  return (
    <Container>
      <ModalTextContainer
        heading={'以下の時間で予約しました'}
        text={'相手が見つかり次第お知らせします。'}
      />
      <ModalReservedDate
        date={response ? getModalDate(response.start_at, 'ja') : ''}
        time={
          response ? getModalTime(response.start_at, response.end_at, 'ja') : ''
        }
        marginBottom={130}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="とじる"
          link={resolvePath.page('teachers', 'mypage')}
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
