import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

import resolvePath from 'utils/resolvePath'

interface Props {
  text: string
  emojiName: string
  isActive: boolean
  onClick: () => void
}

const emojiSrcFn = (emojiName: string, status: string) =>
  `common/evaluation/${emojiName}_${status}@2x.png`

export default ({ text, emojiName, isActive, onClick }: Props) => {
  const emojiSrc = emojiSrcFn(emojiName, isActive ? 'active' : 'inactive')
  return (
    <Container data-active={isActive} onClick={onClick}>
      <Emoji src={resolvePath.image(emojiSrc)} />
      <Description>{text}</Description>
    </Container>
  )
}

const Container = styled.button`
  height: 100px;
  width: 100%;
  padding: 0 47px;
  display: flex;
  border-radius: 45px;
  &[data-active='false'] {
    background: none;
    color: rgb(165, 167, 177);
  }
  &[data-active='true'] {
    background-color: white;
    ${isHuawei()
      ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
      : 'box-shadow: 0 7.5px 37.5px -5px rgba(15, 70, 120, 0.4)'};
    color: rgb(65, 87, 101);
  }
`

const Emoji = styled.img`
  margin-right: 15px;
  height: 64px;
  width: 64px;
  align-self: center;
`

const Description = styled.span`
  font-size: 36px;
  font-weight: 500;
  align-self: center;
`
