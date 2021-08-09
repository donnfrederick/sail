import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

type Status = 'good' | 'normal' | 'bad'

interface Props {
  status: Status
}

export default (props: Props) => {
  const { status } = props
  return status === 'good' ? (
    <Good>
      <Icon
        src={resolvePath.image('students/conversation/network-status@3x.png')}
      />GOOD
    </Good>
  ) : status === 'normal' ? (
    <Normal>
      <Icon
        src={resolvePath.image('students/conversation/network-status@3x.png')}
      />NORMAL
    </Normal>
  ) : status === 'bad' ? (
    <Bad>
      <Icon
        src={resolvePath.image('students/conversation/network-status@3x.png')}
      />BAD
    </Bad>
  ) : null
}

const Good = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 200px;
  height: 56px;
  border-radius: 28px;
  background-color: #00c7c0;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3);'
    : 'box-shadow: 0 6px 10px -4px rgba(5, 68, 102, 0.3),'} ${isHuawei()
    ? ''
    : '  0 0 12px 0 rgba(0, 0, 0, 0.2);'}
  font-size: 22px;
  font-weight: 500;
  line-height: 56px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;
`

const Normal = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 200px;
  height: 56px;
  border-radius: 28px;
  background-color: #e6b122;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3);'
    : 'box-shadow: 0 6px 10px -4px rgba(5, 68, 102, 0.3),'} ${isHuawei()
    ? ''
    : '  0 0 12px 0 rgba(0, 0, 0, 0.2);'}
  font-size: 22px;
  font-weight: 500;
  line-height: 56px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;
`

const Bad = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 200px;
  height: 56px;
  border-radius: 28px;
  background-color: #f75e66;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3);'
    : 'box-shadow: 0 6px 10px -4px rgba(5, 68, 102, 0.3),'} ${isHuawei()
    ? ''
    : '  0 0 12px 0 rgba(0, 0, 0, 0.2);'}
  font-size: 22px;
  font-weight: 500;
  line-height: 56px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;
`

const Icon = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 18px;
  width: 24px;
  height: 24px;
  margin: auto;
`
