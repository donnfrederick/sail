import * as React from 'react'
import styled from 'styled-components'

import resolvePath from 'utils/resolvePath'

interface Props {
  isCenter?: boolean
  text: string
  isActive: boolean
  onSelect: () => void
  onUnselect: () => void
}
export default ({
  isCenter = false,
  text,
  isActive,
  onSelect,
  onUnselect
}: Props) => {
  const onClick = isActive ? onUnselect : onSelect
  return (
    <Container onClick={onClick} isCenter={isCenter}>
      <CheckboxContainer data-active={isActive}>
        <Checkbox
          data-active={isActive}
          src={resolvePath.image('common/evaluation/check@2x.png')}
        />
      </CheckboxContainer>
      <Description>{text}</Description>
    </Container>
  )
}

interface CenterProps {
  isCenter?: boolean
}

const Container = styled<CenterProps, any>('div')`
  height: 90px;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  ${({ isCenter }) => isCenter && 'justify-content: center'};
  align-items: center;
  background: none;
  color: rgb(65, 87, 101);
`

const CheckboxContainer = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  margin-right: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  border: solid 3px rgb(158, 192, 204);
  background-color: white;
  &[data-active='true'] {
    border-color: transparent;
    background-color: rgb(19, 142, 254);
  }
`

const Checkbox = styled<{ isActive: boolean }, any>('img')`
  position: absolute;
  width: 23px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  &[data-active='true'] {
    display: block;
  }
`

const Description = styled.span`
  font-size: 32px;
  font-weight: 500;
`
