import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import * as validate from 'utils/validate'

interface Props {
  error?: any
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { error, info, register } = props

  const hasPasswordError = validate.hasError('パスワード')(error)
  const passwordErrorMessage = validate.getErrorMessage('パスワード')(error)

  return (
    <Container>
      <Label data-error={hasPasswordError}>
        {passwordErrorMessage || 'パスワード'}
      </Label>
      <Input
        data-error={hasPasswordError}
        type="password"
        pattern="^[0-9A-Za-z]+$"
        maxLength={72}
        placeholder="半角英数8字以上"
        defaultValue={info.password}
        onInput={(event: any) => {
          const input = event.target.value
          info.password = input.trim()
          register(info)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 640px;
  margin: 0 auto 56px;
`

const Label = styled.div`
  height: 32px;
  margin-bottom: 16px;
  font-size: 32px;
  letter-spacing: 0px;
  text-align: left;
  color: #405766;

  &[data-error='true'] {
    color: #fa6970;
  }
`

const Input = styled.input`
  appearance: none;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  margin-bottom: 56px;
  padding: 0 32px;
  border: solid 3px transparent;
  border-radius: 8px;
  outline: none;
  background-color: #e3edf5;
  font-size: 36px;
  font-weight: 500;
  line-height: 100px;
  letter-spacing: 0px;
  text-align: left;
  color: #405766;

  &::placeholder {
    opacity: 0.6;
    color: #2d70b3;
  }

  &:focus {
    border: solid 3px #59b4ff;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &[data-error='true'] {
    border: solid 3px #fa6970;
    background-color: #f5e3e3;
    color: #d13e3e;
  }
`
