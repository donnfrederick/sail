import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  isSelected: boolean
  name: string
}

export default (props: Props) => {
  const { isSelected, name } = props

  return <UserName data-selected={isSelected}>{name}</UserName>
}

const UserName = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 20px;
  border-bottom: 1px solid #e9eef2;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #405766;

  &::before {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 45px;
    width: 18px;
    height: 30px;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url(${resolvePath.image('teachers/right-arrow@3x.png')});
    content: '';
  }

  &::after {
    margin-right: 8px;
    font-size: 24px;
    letter-spacing: 0px;
    color: #405766;
    transform: translateY(4px);
    content: 'さん';
  }

  &[data-selected='true'] {
    color: #138efd;

    &::before {
      right: 32px;
      width: 44px;
      height: 44px;
      background-image: url(${resolvePath.image('teachers/check-blue@3x.png')});
    }

    &::after {
      color: #138efd;
    }
  }
`
