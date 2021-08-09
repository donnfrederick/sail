import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import CompleteAccusationModal from 'components/organisms/teachers/modal_contents/complete_accusation'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as AccusationsModels from 'models/accusations'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'
import isHuawei from 'utils/isHuawei'

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  myId: number
  reasons: AccusationsModels.Reason[]
  selectedReasonId: number | null
  close(): void
  postAccusations(
    authToken: string,
    parameters: AccusationsModels.AccusationsRequest
  ): Promise<void>
  selectReason(id: number): void
  setContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    authToken,
    close,
    conversation,
    myId,
    reasons,
    selectedReasonId,
    postAccusations,
    selectReason,
    setContents
  } = props

  const partner = conversation ? getPartner(conversation, myId) : null

  return (
    <Container>
      <ModalTextContainer heading={'通報理由を教えてください'} />
      <ReasonList>
        {reasons.map(reason => (
          <ReasonItem key={reason.id}>
            <RadioButton
              type="radio"
              id={String(reason.id)}
              checked={selectedReasonId === reason.id}
              onClick={() => selectReason(reason.id)}
            />
            <ReasonLabel htmlFor={String(reason.id)}>{reason.name}</ReasonLabel>
          </ReasonItem>
        ))}
      </ReasonList>
      <ButtonContainer>
        <Button
          type="white"
          text="閉じる"
          width={272}
          height={112}
          fontSize={40}
          onClick={() => close()}
        />
        <Button
          type="blue"
          text="通報"
          isActive={selectedReasonId !== null}
          width={272}
          height={112}
          fontSize={40}
          onClick={async () => {
            if (conversation && partner && selectedReasonId) {
              const parameters: AccusationsModels.AccusationsRequest = {
                accusation_reason_id: selectedReasonId,
                conversation_id: conversation.id,
                user_id: partner.id
              }

              try {
                await postAccusations(authToken, parameters)
                setContents(<CompleteAccusationModal />)
              } catch (error) {
                // tslint:disable-next-line
                console.error(error)
                setContents(<FailFetchingModal />)
              }
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
  text-align: center;
`

const ReasonList = styled.div`
  width: 582px;
  margin-bottom: 78px;
  text-align: left;
`

const ReasonItem = styled.div`
  width: 100%;
  height: 44px;
  margin-bottom: 32px;
`

const RadioButton = styled.input`
  display: none;
`

const ReasonLabel = styled.label`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  font-size: 32px;
  letter-spacing: normal;
  color: #405766;

  &::before {
    display: inline-block;
    width: 26px;
    height: 26px;
    margin-right: 24px;
    border-radius: 50%;
    border: solid 6px #fff;
    ${isHuawei()
      ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
      : 'box-shadow: 0 0 0 3px #9eb0bb'};
    content: '';
  }

  input:checked + &::before {
    background-color: #138efd;
    ${isHuawei()
      ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
      : 'box-shadow: 0 0 0 3px #138efd'};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
