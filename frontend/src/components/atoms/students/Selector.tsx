import * as React from 'react'
import styled from 'styled-components'

export interface Option {
  value: string | number
  text?: string
  show?: boolean
}

interface Props {
  defaultValue: string
  noDefault?: boolean
  options: Option[]
  placeholder?: string
  onChange?(event: any): void
}

export default (props: Props) => {
  const { defaultValue, noDefault, options, placeholder, onChange } = props

  return options.length || noDefault ? (
    <Selector
      onChange={onChange}
      defaultValue={noDefault ? (placeholder ? '' : undefined) : defaultValue}
      required={true}
    >
      {placeholder ? (
        <Placeholder value="" disabled={true}>
          {placeholder}
        </Placeholder>
      ) : null}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.text || option.value}
        </option>
      ))}
    </Selector>
  ) : null
}

const Selector = styled.select`
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
  padding-right: 65px;

  &:focus {
    border-bottom: 1px solid #405766;
  }

  &::placeholder {
    color: #2d70b3;
  }
`

const Placeholder = styled.option`
  display: none;
`
