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
  const registGender = (event: any) => {
    const value = event.target.textContent
    info.gender = value
    register(info)
  }

  return (
    <Container>
      <RoundButton
        text="男性"
        size={size}
        onClick={registGender}
        isSelected={info.gender === '男性'}
        alwaysOn={false}
      />
      <RoundButton
        text="女性"
        size={size}
        onClick={registGender}
        isSelected={info.gender === '女性'}
        alwaysOn={false}
      />
    </Container>
  )
}

const size: number = 240

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 560px;
  margin: 0 auto 304px;
`
