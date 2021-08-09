import * as React from 'react'
import styled from 'styled-components'

interface Props {
  currentStep: number
  stepCount: number
}

export default ({ currentStep, stepCount }: Props) => {
  return (
    <Container>
      <Bar currentStep={currentStep - 1} stepCount={stepCount} />
      {[...Array(stepCount)].map((elm, i) => {
        const step = i + 1
        return (
          <Circle
            key={currentStep + i}
            data-completed={isCompleted(step, currentStep) ? true : false}
            data-current={step === currentStep}
          >
            {step}
          </Circle>
        )
      })}
    </Container>
  )
}

const isCompleted = (step: number, currentStep: number) => step <= currentStep
const getCurrentBar = (currentStep: number, stepCount: number) =>
  currentStep / (stepCount - 1)

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 640px;
  height: 64px;
  margin: 0 auto 56px;
`

const Circle = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #c9e0f2;
  font-size: 32px;
  font-weight: 500;
  line-height: 45px;
  text-align: center;
  color: #ffffff;

  &[data-completed='true'] {
    background-color: #138efd;
  }

  &[data-current='true'] {
    width: 64px;
    height: 64px;
    background-color: #138efd;
    font-size: 42px;
    line-height: 60px;
  }
`

const Bar = styled<Props, any>('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 4px;
  margin: auto;
  background-color: #c9e0f2;
  background-image: linear-gradient(
    90deg,
    #138efd 0%,
    #138efd ${props => getCurrentBar(props.currentStep, props.stepCount) * 100}%,
    #c9e0f2 ${props => getCurrentBar(props.currentStep, props.stepCount) * 100}%,
    #c9e0f2 100%
  );
`
