import scrollStopper from 'hocs/scrollStopper'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

interface Props {
  contents: JSX.Element | null
  isOpened: boolean
}

export default (props: Props) => {
  const { contents, isOpened } = props

  return isOpened ? (
    <Container>
      <ScrollStopper />
      <Modal>{contents}</Modal>
    </Container>
  ) : null
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.3);
  touch-action: none;
`

const ScrollStopper = styled(scrollStopper(() => <div />))``

const Modal = styled.div`
  width: 672px;
  box-sizing: border-box;
  padding: 72px 46px;
  border-radius: 16px;
  background-color: #f6f7fb;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 70px 0 rgba(5, 68, 102, 0.5)'};
`
