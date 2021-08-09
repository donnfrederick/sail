import * as React from 'react'
import styled from 'styled-components'

export default ({ text }: { text: string | number }) => (
  <Container>
    <Label>日本語レベル</Label>
    <div>{text}</div>
  </Container>
)

const Container = styled.div`
  margin: 45px 15px 0 15px;
  padding-bottom: 45px;
  font-size: 36px;
  display: flex;
`

const Label = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-right: 30px;
`
