import * as React from 'react'
import styled from 'styled-components'

interface Props {
  currentStep: number
  stepCount: number
}

export default (props: Props) => {
  const { currentStep, stepCount } = props

  return (
    <Container>
      <StepsContainer>
        <Bar currentStep={currentStep - 1} />
        {[...Array(stepCount)].map((element, index) => {
          const step = index + 1
          return (
            <Circle
              key={step}
              data-completed={isCompleted(step, currentStep)}
              data-current={step === currentStep}
            />
          )
        })}
      </StepsContainer>
    </Container>
  )
}

const isCompleted = (step: number, currentStep: number) => step <= currentStep
const getCurrentBar = (currentStep: number, stepCount: number) =>
  currentStep / (stepCount - 1)

const barWidth = 312

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 88px;
`

const StepsContainer = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 34px;
  margin: auto;
`

const Circle = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #aad3f2;

  &[data-completed='true'] {
    background-color: #138efd;
  }

  &[data-current='true'] {
    border: 7px solid #f6f7fb;

    &::after {
      display: block;
      position: absolute;
      top: -8px;
      left: -8px;
      width: 34px;
      height: 34px;
      box-sizing: border-box;
      border: 2px solid #138efd;
      border-radius: 50%;
      content: '';
    }
  }
`

const Bar = styled<Props, any>('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: ${barWidth}px;
  height: 2px;
  margin: auto;
  background-color: #aad3f2;
  background-image: linear-gradient(
    90deg,
    #138efd 0%,
    #138efd
      ${props =>
        (getCurrentBar(props.currentStep, props.stepCount) / barWidth) * 100}%,
    #aad3f2
      ${props =>
        (getCurrentBar(props.currentStep, props.stepCount) / barWidth) * 100}%,
    #aad3f2 100%
  );
`
