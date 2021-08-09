import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return <Arrow />
}

const Arrow = styled.div`
  pointer-events: none;
  display: block;
  position: absolute;
  bottom: 32px;
  right: 16px;
  width: 20px;
  height: 12px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${resolvePath.image('common/selector@3x.png')});
`
