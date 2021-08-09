import * as React from 'react'
import styled from 'styled-components'

import Steps from 'components/atoms/students/Steps'
import resolvePath from 'utils/resolvePath'

interface Props {
  currentStep: number
  stepCount: number
  onClickBackButton: () => void
}

export default (props: Props) => {
  const { currentStep, stepCount, onClickBackButton } = props

  return (
    <Container>
      <Steps currentStep={currentStep} stepCount={stepCount} />
      <BackButton onClick={onClickBackButton} />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 88px;
  width: 622px;
  margin: auto 0;
  left: auto;
  right: auto;
`

const BackButton = styled<Props, any>('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 32px;
  width: 24px;
  height: 42px;
  margin: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${resolvePath.image('common/left-arrow@3x.png')});
`
