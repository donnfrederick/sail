import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

interface Props {
  marginBottom?: number
  onClick(): void
}

export default (props: Props) => {
  const { marginBottom = 0, onClick } = props

  return (
    <Container marginBottom={marginBottom} onClick={onClick}>
      ログアウト
    </Container>
  )
}

const Container = styled<Props, any>('div')`
  width: 100%;
  height: 135px;
  margin-bottom: ${props => props.marginBottom}px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 5px 0 rgba(5, 68, 102, 0.1)'};
  font-size: 32px;
  font-weight: 500;
  line-height: 135px;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;
`
