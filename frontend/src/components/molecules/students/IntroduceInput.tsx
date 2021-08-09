// import InputArea from 'components/atoms/students/InputArea'
import InputLabel from 'components/atoms/students/InputLabel'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  introduce: string
  info: StudentsModels.Info
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { info, introduce, register } = props

  return (
    <Container>
      <InputLabel text={'Self Introduction (MAX: 144 characters)'} />
      <Introduce
        width={640}
        type="text"
        placeholder="Example: I live in Tokyo."
        maxLength={144}
        defaultValue={introduce}
        onInput={(event: any) => {
          const input = event.target.value
          info.introduce = input.trim()
          register(info)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 624px;
  margin: 0 auto 80px;
`

const Introduce = styled<{ width: number }, any>('textarea')`
  height: 200px;
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
