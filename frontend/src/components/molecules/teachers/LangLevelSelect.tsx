import FlatButton from 'components/atoms/teachers/FlatButton'
import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { info, register } = props
  const registLangLevel = (event: any) => {
    const value = event.target.textContent
    info.desiredCondition = value
    register(info)
  }
  return (
    <Container>
      {levels.map(text => {
        return (
          <FlatButton
            key={text}
            text={text}
            isSelected={info.desiredCondition === text}
            width={640}
            height={100}
            marginBottom={48}
            withBorder={true}
            onClick={registLangLevel}
          />
        )
      })}
    </Container>
  )
}

const levels = ['日本語が得意な方がいい', '日本語が不得意でも構わない']

const Container = styled.div`
  width: 600px;
  height: 600px;
  margin: 0 auto 48px;
`
