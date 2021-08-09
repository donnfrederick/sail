import Button from 'components/atoms/students/Button'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Container>
      <Heading>{'It looks like you are lost'}</Heading>
      <Img src={resolvePath.image('students/404@3x.png')} />
      <ButtonContainer>
        <Button type="blue" text="Back" width={494} height={88} link={'/'} />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
`

const Heading = styled.div`
  position: absolute;
  top: 168px;
  right: 0;
  left: 0;
  margin: auto;
  font-size: 32px;
  color: #405766;
`

const Img = styled.img`
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  width: 622px;
  height: 924px;
  margin: auto;
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 1074px;
  right: 0;
  left: 0;
  margin: auto;
`
