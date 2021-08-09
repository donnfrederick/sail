import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

interface Props {
  text: string
  link: string
}

export default (props: Props) => {
  const { text, link } = props
  return (
    <Container>
      <StyledLink to={link}>
        <Text>{text}</Text>
        <Arrow src={resolvePath.image('teachers/arrow@3x.png')} />
      </StyledLink>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 135px;
  box-sizing: border-box;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 5px 0 rgba(5, 68, 102, 0.1)'};
  padding-left: 40px;
  border-bottom: 1px solid #e9eef2;
  background-color: #ffffff;
`

const Text = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 134px;
  text-align: left;
  color: #405766;
`

const Arrow = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 45px;
  width: 18px;
  height: 30px;
  margin: auto;
`

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
`
