import { Me } from 'models/sessions'
import { Info } from 'models/teachers'
// import { info } from 'mocks/sampleData/me'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  info: Info
  me: Me
  width?: number
  register(info: Info): void
}

export default (props: Props) => {
  const { me, info, register, width = 640 } = props
  return (
    <Introduce
      width={width}
      name="introduce"
      maxLength={100}
      placeholder="例:仙台に住んでいます。"
      defaultValue={me.introduce}
      onInput={(event: any) => {
        const input = event.target.value
        info.introduce = input.trim()
        register(info)
      }}
    />
  )
}

const Introduce = styled<{ width: number }, any>('textarea')`
  height: 390px;
  width: ${({ width }) => width}px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  border-color: transparent;
  color: rgb(120, 162, 203);
  background-color: rgb(228, 235, 245);
  font-weight: 500;
  font-size: 26px;
`
