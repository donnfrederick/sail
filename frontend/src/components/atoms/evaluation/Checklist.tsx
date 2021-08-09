import * as React from 'react'
import styled from 'styled-components'

import resolvePath from 'utils/resolvePath'

interface Props {
  text: string
}
export default ({ text }: Props) => {
  const checkSrc = resolvePath.image('common/evaluation/check_red@2x.png')
  return (
    <Container>
      <Check src={checkSrc} />
      <Description>{text}</Description>
    </Container>
  )
}

interface CenterProps {
  isCenter?: boolean
}

const Container = styled<CenterProps, any>('div')`
  height: 41px;
  width: 100%;
  margin-bottom: 17px;
  display: flex;
  ${({ isCenter }) => isCenter && 'justify-content: center'};
  align-items: center;
  background: none;
  color: rgb(65, 87, 101);
`

const Check = styled.img`
  margin-right: 10px;
  width: 23px;
`

const Description = styled.span`
  font-size: 28px;
`
