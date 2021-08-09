import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Container>
      <Title>
        <Logo src={resolvePath.image('common/sail@3x.png')} />
      </Title>
      <SubTitle>さあ、世界へ船出しよう</SubTitle>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 0;
`

const Title = styled.h1`
  height: 180px;
  margin: 0 0 36px;
  text-align: center;
`

const Logo = styled.img`
  height: 100%;
`

const SubTitle = styled.h2`
  margin: 0;
  font-size: 38px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  text-align: center;
  color: #000000;
`
