import RoundButton from 'components/atoms/teachers/RoundButton'
import { Hobbie } from 'models/sessions'
import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import { getHobbieNames } from 'utils/manipulate'

interface Props {
  hobbies: Hobbie[]
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { hobbies, info, register } = props

  const registInterest = (event: any) => {
    const value = event.target.textContent
    const currentContent: string[] = info.hobbies
    info.hobbies = currentContent.includes(value)
      ? currentContent.filter(element => element !== value)
      : currentContent.length < 3
        ? currentContent.concat([value])
        : currentContent

    register(info)
  }
  return (
    <Container>
      {getHobbieNames(hobbies).map(name => {
        return (
          <RoundButton
            key={name}
            text={name}
            fontSize={shouldSmallFont(name) ? 36 : 48}
            size={size}
            onClick={registInterest}
            isSelected={info.hobbies.includes(name)}
          />
        )
      })}
    </Container>
  )
}

const shouldSmallFont = (text: string) => text === 'スポーツ'

const size: number = 172

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-flow: wrap;
  width: 600px;
  height: 600px;
  margin: 0 auto 48px;
`
