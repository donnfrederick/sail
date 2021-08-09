import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

interface Props {
  isFavorite: boolean
  onClick: () => void
}

export default ({ isFavorite, onClick }: Props) => {
  return (
    <Button onClick={onClick} data-favorite={isFavorite}>
      <Icon>{isFavorite ? '★' : '+'}</Icon>
      <Text>お気に入り{isFavorite ? '' : 'に追加'}</Text>
    </Button>
  )
}

const Icon = styled.div`
  flex: 1 0 auto;
  width: 32px;
  height: 32px;
  margin-left: 15px;
  background: white;
  border-radius: 50%;
  color: #138efd;
  text-align: center;
  font-size: 32px;
  line-height: 32px;
  font-weight: bold;
`

const Text = styled.div`
  width: 100%;
  margin-right: 24px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 308px;
  height: 56px;
  background: #138efd;
  color: white;
  border-radius: 30px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.25)'};
  &[data-favorite='true'] {
    background: white;
    color: #138efd;
    & > ${Icon} {
      background: #138efd;
      color: white;
      font-size: 14px;
    }
  }
`
