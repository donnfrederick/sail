import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import { store } from 'components/organisms/Router'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  authToken: string
  loadAll?: boolean
  page?: number
  reservationId: number
  close(): void
  deleteConversations(authToken: string, id: number): void
  getConversations(
    authToken: string,
    parameters: ConversationModels.ConversationRequest
  ): void
}

export default (props: Props) => {
  const {
    authToken,
    loadAll = false,
    page = 1,
    reservationId,
    close,
    deleteConversations,
    getConversations
  } = props

  const parameters: ConversationModels.ConversationRequest = loadAll
    ? {}
    : {
        page,
        term: 'week'
      }
  const nextPage = loadAll ? 'reservations' : 'mypage'

  return (
    <Container>
      <ModalTextContainer heading={'本当に予約を取り消しますか？'} />
      <ButtonContainer>
        <Button
          type="white"
          text="いいえ"
          width={272}
          height={112}
          onClick={() => close()}
        />
        <Button
          type="red"
          text="はい"
          width={272}
          height={112}
          onClick={async () => {
            await deleteConversations(authToken, reservationId)
            await getConversations(authToken, parameters)
            store.dispatch(push(resolvePath.page('teachers', nextPage)))
            close()
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
  justify-content: space-between;
  width: 100%;
`
