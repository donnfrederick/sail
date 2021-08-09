import * as React from 'react'
import styled from 'styled-components'
import getformattedTime from 'utils/getFormattedTime'

interface Props {
  time: string
}

export default (props: Props) => {
  const { time } = props
  return <Time>{getformattedTime(time)}</Time>
}

const Time = styled.time`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 143px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: right;
  color: #90aec1;
`
