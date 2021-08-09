import * as React from 'react'
import styled from 'styled-components'

interface Props {
  badge?: string | null
  code: string | null
  src: string
  srcSet?: string
  size: number
  marginBottom?: number
  withBorder?: boolean
}

interface BadgeProps {
  photoSize: number
  width: number
}

export default (props: Props) => {
  const { code, badge, src, srcSet, size, marginBottom, withBorder } = props

  const fraction = 3.0

  return (
    <Image>
      <Img
        src={src}
        srcSet={srcSet || ''}
        width={`${size}px`}
        height={`${size}px`}
        marginBottom={marginBottom}
        data-border={withBorder}
      />
      {badge ? (
        <Badge
          src={'/assets/img/common/flags/' + code + '.png'}
          width={size / fraction}
          photoSize={size}
        />
      ) : null}
    </Image>
  )
}

const Image = styled.div`
  box-sizing: border-box;
  position: relative;
`

const Badge = styled<BadgeProps, any>('img')`
  box-sizing: border-box;
  width: ${props => props.width}px;
  position: absolute;
  bottom: -5%;
  right: calc(50% - ${props => props.photoSize / 2}px);
`

const Img = styled<Props, any>('img')`
  box-sizing: border-box;
  border-radius: 50%;
  margin-bottom: ${props => props.marginBottom}px;

  &[data-border='true'] {
    border: 4px solid rgba(255, 255, 255, 0.8);
  }
`
