import SignoutModal from 'components/organisms/students/modal_contents/signout'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

interface Props {
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const { openModal, setModalContents } = props

  return (
    <Signout
      onClick={() => {
        setModalContents(<SignoutModal />)
        openModal()
      }}
    >
      Sign Out
    </Signout>
  )
}

const Signout = styled.div`
  width: 100%;
  height: 100px;
  margin: 80px 0;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 6px 0 rgba(5, 68, 102, 0.1)'};
  background-color: #ffffff;
  font-size: 32px;
  font-weight: 500;
  line-height: 100px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #138efd;
`
