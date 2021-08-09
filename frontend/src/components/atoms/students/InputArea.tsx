import * as React from 'react'
import styled from 'styled-components'

interface Props {
  defaultValue: string
  hasError?: boolean
  isDisabled?: boolean
  isName?: boolean
  noDefault?: boolean
  placeholder?: string
  type?: string
  onInput?(event: any): void
}

export default (props: Props) => {
  const {
    defaultValue,
    hasError,
    isDisabled,
    isName,
    noDefault,
    placeholder,
    type,
    onInput
  } = props
  return defaultValue || noDefault ? (
    <Input
      data-error={hasError}
      disabled={isDisabled}
      type={type || 'text'}
      placeholder={placeholder}
      onInput={onInput}
      defaultValue={defaultValue !== '' ? defaultValue : undefined}
      data-name-input-ja={isName}
    />
  ) : null
}

const Input = styled.input`
  appearance: none;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #a3b0b8;
  outline: none;
  background-color: #f6f7fb;
  font-size: 32px;
  line-height: 48px;
  vertical-align: top;
  color: #405766;

  &:focus {
    border-bottom: 2px solid #138efd;
  }

  &::placeholder {
    opacity: 0.6;
    color: #2d70b3;
  }

  &[data-error='true'] {
    border-bottom: 4px solid #fa6970;
  }
`
