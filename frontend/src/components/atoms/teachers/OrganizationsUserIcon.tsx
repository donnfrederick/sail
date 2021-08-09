import * as React from 'react'
import styled from 'styled-components'

interface Props {
  src: string
}

export default (props: Props) => {
  const { src } = props

  return <UserIcon src={src} />
}

const UserIcon = styled.img`
  width: 88px;
  height: 88px;
  margin: 0 20px 0 40px;
`
