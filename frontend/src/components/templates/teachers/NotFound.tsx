import Button from 'components/atoms/teachers/Button'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Container>
      <Heading>ページが見つかりません</Heading>
      <Img src={resolvePath.image('teachers/404@3x.png')} />
      <Button type="white" text="戻る" width={384} height={112} link={'/'} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 128px 0 0;
  text-align: center;
`

const Heading = styled.div`
  margin-bottom: 72px;
  font-size: 40px;
  color: #405766;
`

const Img = styled.img`
  width: 618px;
  height: 691px;
  margin-bottom: 85px;
`
