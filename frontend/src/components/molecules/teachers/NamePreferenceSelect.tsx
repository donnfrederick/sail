import RoundButton from 'components/atoms/teachers/RoundButton'
import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { info, register } = props

  const FULL_NAME = 'フルネーム'
  const FIRST_NAME = 'めい'
  const LAST_NAME = 'せい'

  const registNamePreference = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.currentTarget.textContent

    switch (value) {
      case FULL_NAME: {
        info.preferred_name = 1
        break
      }
      case FIRST_NAME: {
        info.preferred_name = 2
        break
      }
      case LAST_NAME: {
        info.preferred_name = 3
        break
      }
      default: {
        info.preferred_name = 1
        break
      }
    }

    register(info)
  }

  return (
    <Container>
      <RoundButton
        text={FULL_NAME}
        size={size}
        onClick={registNamePreference}
        isSelected={info.preferred_name === 1}
        alwaysOn={false}
      />
      <RoundButton
        text={FIRST_NAME}
        size={size}
        onClick={registNamePreference}
        isSelected={info.preferred_name === 2}
        alwaysOn={false}
      />
      <RoundButton
        text={LAST_NAME}
        size={size}
        onClick={registNamePreference}
        isSelected={info.preferred_name === 3}
        alwaysOn={false}
      />
    </Container>
  )
}

const size: number = 240

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-flow: wrap;
  width: 600px;
  height: 600px;
  margin: 0 auto 150px;
`
