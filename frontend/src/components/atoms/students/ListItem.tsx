import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  text: string
  link: string
}

export default (props: Props) => {
  const { text, link } = props
  return (
    <Container>
      {link.includes('students') ? (
        <StyledLink to={link}>
          <Text>{text}</Text>
          <Arrow src={resolvePath.image('students/profile/arrow@3x.png')} />
        </StyledLink>
      ) : (
        <a href={link}>
          <Text>{text}</Text>
        </a>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding-left: 48px;
  border-bottom: 1px solid #e9eef2;
  background-color: #ffffff;
`

const Text = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 100px;
  color: #405766;
`

const Arrow = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 32px;
  width: 16px;
  height: 28px;
  margin: auto;
`

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
`
