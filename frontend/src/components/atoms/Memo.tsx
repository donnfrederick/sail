import * as React from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  width?: number
}

export default ({ value, onChange, width = 640 }: Props) => (
  <Memo width={width} onChange={onChange} value={value} />
)

const Memo = styled<{ width: number }, any>('textarea')`
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
