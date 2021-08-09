import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  isActive: boolean
  onClick: () => void
}
export default ({ text, isActive, onClick }: Props) => (
  <Container onClick={onClick}>
    <RadioButton data-active={isActive} />
    <Description>{text}</Description>
  </Container>
)

const Container = styled.button`
  height: 90px;
  min-width: 350px;
  max-width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background: none;
  color: rgb(65, 87, 101);
`

const RadioButton = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 25px;
  border-radius: 50%;
  &[data-active='true'] {
    background-color: rgb(34, 145, 250);
    &::before {
      border-color: rgb(34, 145, 250);
    }
  }
  &::before {
    content: '';
    position: absolute;
    width: 42.5px;
    height: 42.5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgb(159, 176, 186);
    border-radius: 50%;
  }
`

const Description = styled.span`
  font-size: 36px;
  font-weight: 500;
`
