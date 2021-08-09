import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

type Status = 'good' | 'normal' | 'bad'

interface Props {
  status: Status
}

export default (props: Props) => {
  const { status } = props
  return status === 'good' ? (
    <Good>回線状況 : 良</Good>
  ) : status === 'normal' ? (
    <Normal>回線状況 : 普通</Normal>
  ) : status === 'bad' ? (
    <Bad>回線状況 : 悪</Bad>
  ) : null
}

const Good = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 216px;
  height: 48px;
  border-radius: 24px;
  background-color: #00c7c0;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2)'};
  font-size: 24px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const Normal = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 216px;
  height: 48px;
  border-radius: 24px;
  background-color: #e6b122;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2)'};
  font-size: 24px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const Bad = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 216px;
  height: 48px;
  border-radius: 24px;
  background-color: #f75e66;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2)'};
  font-size: 24px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`
