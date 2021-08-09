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

  const hasEmailError = validate.hasError('メールアドレス')(error)
  const emailErrorMessage = validate.getErrorMessage('メールアドレス')(error)

  return (
    <Container>
      <Label data-error={hasEmailError}>
        {emailErrorMessage || 'メールアドレス'}
      </Label>
      <Input
        data-error={hasEmailError}
        name="mail"
        maxLength={254}
        placeholder="sail@example.com"
        defaultValue={info.email}
        onInput={(event: any) => {
          const input = event.target.value
          info.email = input.trim()
          register(info)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 640px;
  height: 148px;
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

  &[data-error='true'] {
    border: solid 3px #fa6970;
    background-color: #f5e3e3;
    color: #d13e3e;
  }
`
