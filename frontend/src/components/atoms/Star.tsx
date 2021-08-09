import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

type StarType = 'full' | 'half' | 'empty'

interface Props {
  sideMargin?: number
  size?: number
  type: StarType
  setEvaluation?: () => void
}

export default (props: Props) => {
  const { sideMargin = 12, size, type, setEvaluation } = props
  return (
    <Star
      sideMargin={sideMargin}
      size={size}
      src={
        type === 'full'
          ? resolvePath.image('common/full-star@3x.png')
          : type === 'half'
            ? resolvePath.image('common/half-star@3x.png')
            : type === 'empty'
              ? resolvePath.image('common/empty-star@3x.png')
              : ''
      }
      onClick={setEvaluation}
    />
  )
}

const Star = styled<Props, any>('img')`
  width: ${props => props.size || 50}px;
  height: ${props => props.size || 50}px;
  margin: 0 ${props => props.sideMargin}px;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`
