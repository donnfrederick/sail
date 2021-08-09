import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as R from 'ramda'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  info: StudentsModels.Info
  purposes: SessionsModels.Purpose[]
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { purposes, info, register } = props

  const registInterest = (event: any) => {
    const value = event.target.textContent
    const targetPurpose = R.find(R.propEq('name', value))(purposes)
    info.purposes = R.contains(targetPurpose, info.purposes)
      ? R.filter(purpose => !R.equals(targetPurpose, purpose), info.purposes)
      : info.purposes.concat(targetPurpose)

    register(info)
  }

  return (
    <Buttons>
      {purposes.map(purpose => (
        <PurposeButton
          key={purpose.id}
          data-checked={R.contains(purpose, info.purposes)}
          onClick={registInterest}
        >
          {purpose.name}
        </PurposeButton>
      ))}
    </Buttons>
  )
}

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
`

const PurposeButton = styled.button`
  appearance: none;
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  margin: 0 0 32px;
  padding: 0 40px;
  outline: none;
  border: 2px solid #138efd;
  border-radius: 44px;
  background-color: #f6f7fb;
  background-image: none;
  font-size: 28px;
  font-weight: 500;
  line-height: 84px;
  text-align: center;
  color: #138efd;

  &[data-checked='true'] {
    background-image: linear-gradient(293deg, #2eb1ff, #138efd);
    color: #ffffff;
  }
`
