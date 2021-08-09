import * as React from 'react'
import styled from 'styled-components'
import getformattedTime from 'utils/getFormattedTime'

interface Props {
  time: string
}

export default (props: Props) => {
  const { time } = props
  return <Time>{getformattedTime(time, 'en')}</Time>
}

const Time = styled.time`
  position: absolute;
  top: 48px;
  right: 48px;
  width: 240px;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: right;
  color: #90aec1;
`
