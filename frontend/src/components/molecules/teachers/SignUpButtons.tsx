import Button from 'components/atoms/teachers/Button'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  hasChanged: boolean
  step: number
  showConfirmation: boolean
  forwardEvent?: (event: Event) => void
  backEvent?: (event: Event) => void
  confirmEvent?: (event: Event) => void
  cancelEvent?: (event: Event) => void
  signupEvent?: () => void | Promise<void>
}

export default (props: Props) => {
  const {
    hasChanged,
    step,
    showConfirmation,
    forwardEvent,
    backEvent,
    confirmEvent,
    cancelEvent,
    signupEvent
  } = props
  return (
    <Container key={String(hasChanged)}>
      {isSatisfaction(step) ? (
        <Button
          type="white"
          text="戻る"
          fontSize={40}
          link={resolvePath.page('teachers')}
        />
      ) : (
        <Button
          type="white"
          text={showConfirmation ? '修正する' : '戻る'}
          fontSize={40}
          onClick={showConfirmation ? cancelEvent : backEvent}
        />
      )}
      <Button
        isActive={hasChanged}
        type="blue"
        text={showConfirmation ? '登録する' : '次へ'}
        fontSize={40}
        onClick={
          showConfirmation
            ? signupEvent
            : isFinalStep(step)
              ? confirmEvent
              : forwardEvent
        }
      />
    </Container>
  )
}

const isSatisfaction = (step: number) => step === 1
const isFinalStep = (step: number) => step >= 8

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 640px;
  height: 148px;
  margin: 0 auto 56px;
`
