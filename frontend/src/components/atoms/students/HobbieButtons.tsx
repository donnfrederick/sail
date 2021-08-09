import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as R from 'ramda'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  hobbies: SessionsModels.Hobbie[]
  info: StudentsModels.Info
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { hobbies, info, register } = props

  const registInterest = (event: any) => {
    const value = event.target.textContent
    const targetHobbie = R.find(R.propEq('name', value))(hobbies)
    info.hobbies = R.contains(targetHobbie, info.hobbies)
      ? R.filter(hobbie => !R.equals(targetHobbie, hobbie), info.hobbies)
      : info.hobbies.length < 3
        ? info.hobbies.concat(targetHobbie)
        : info.hobbies

    register(info)
  }

  return (
    <Buttons>
      {hobbies.map(hobbie => (
        <HobbieButton
          key={hobbie.id}
          data-checked={R.contains(hobbie, info.hobbies)}
          onClick={registInterest}
        >
          {hobbie.name}
        </HobbieButton>
      ))}
    </Buttons>
  )
}

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
`

const HobbieButton = styled.button`
  appearance: none;
  height: 88px;
  box-sizing: border-box;
  margin: 0 8px 32px;
  padding: 0 35px;
  outline: none;
  border: 2px solid #138efd;
  border-radius: 44px;
  background-color: #f6f7fb;
  background-image: none;
  font-size: 32px;
  font-weight: 500;
  line-height: 84px;
  text-align: center;
  color: #138efd;

  &[data-checked='true'] {
    background-image: linear-gradient(293deg, #2eb1ff, #138efd);
    color: #ffffff;
  }
`
