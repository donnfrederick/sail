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
      {[...Array(stepCount)].map((elm, i) => {
        const step = i + 1
        return (
          <Circle key={currentStep + i} data-current={step === currentStep} />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 780px;
  width: 150px;
  padding: 20px;
  margin-left: 180px;
  margin-top: auto;
`

const Circle = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #c9e0f2;
  font-size: 32px;
  font-weight: 500;
  line-height: 45px;
  text-align: center;
  color: #ffffff;

  &[data-current='true'] {
    width: 20px;
    height: 20px;
    background-color: #42a1f8;
    font-size: 42px;
    line-height: 60px;
  }
`
