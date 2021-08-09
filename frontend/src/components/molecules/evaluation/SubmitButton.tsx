import * as React from 'react'

import Button, { ButtonType } from 'components/atoms/students/Button'

interface Props {
  fontSize?: number
  isActive?: boolean
  link?: string
  text: string
  type?: ButtonType
  width?: number
  height?: number
  marginBottom?: number
  onClick?(): void
}

export default ({
  fontSize,
  isActive = true,
  link,
  onClick,
  text,
  type = 'blue',
  width = 360,
  height,
  marginBottom = 50
}: Props) => {
  return (
    <Button
      fontSize={fontSize}
      isActive={isActive}
      onClick={onClick}
      text={text}
      type={type}
      marginBottom={marginBottom}
      width={width}
      height={height}
      link={link}
    />
  )
}
