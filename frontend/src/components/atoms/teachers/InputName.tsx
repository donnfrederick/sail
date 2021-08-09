import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import * as validate from 'utils/validate'

interface Props {
  error?: any
  info: Info
  register(info: Info): void
}

type NameType = 'first' | 'last'

export default (props: Props) => {
  const { error, info, register } = props

  const registName = () => {
    const inputs = document.querySelectorAll('[data-name-input]')
    const values = Array.from(inputs, (input: HTMLInputElement) => input.value)
    const name = values.join(' ')
    info.name = name
    register(info)
  }

  const getSeparatedName = (type: NameType) => {
    return info.name.split(' ')[type === 'first' ? 0 : 1]
  }

  const hasNameError = validate.hasError('名前')(error)
  const nameErrorMessage = validate.getErrorMessage('名前')(error)

  return (
    <Container>
      <Label data-error={hasNameError}>{nameErrorMessage || 'せい'}</Label>
      <Input
        data-error={hasNameError}
        maxLength={30}
        placeholder="やまだ"
        defaultValue={getSeparatedName('first')}
        onInput={registName}
        data-name-input={true}
      />
      <Label>めい</Label>
      <Input
        data-error={hasNameError}
        maxLength={30}
        placeholder="たろう"
        defaultValue={getSeparatedName('last')}
        onInput={registName}
        data-name-input={true}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 640px;
  margin: 0 auto 240px;
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

  &:last-child {
    margin-bottom: 0;
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
