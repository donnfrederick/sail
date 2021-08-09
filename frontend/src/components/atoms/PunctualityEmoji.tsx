import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  emojiSize?: number
  fontSize?: number
  absence: number
  lateness: number
}
export default ({ absence, emojiSize, fontSize, lateness }: Props) => {
  const isAbsence = absence > 0
  const isLateness = lateness > 0
  const punctualityValue = isAbsence ? absence : isLateness ? lateness : null
  const punctualityText = isAbsence ? '欠席' : isLateness ? '遅刻' : null
  const valueText =
    punctualityValue && punctualityText
      ? `${punctualityText}${punctualityValue}回`
      : `遅刻なし`
  return (
    <Container>
      <Emoji
        size={emojiSize}
        src={resolvePath.image('common/evaluation/punctuality@3x.png')}
      />
      <Value fontSize={fontSize}>{valueText}</Value>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`

const Emoji = styled<{ size: number }, any>('img')`
  width: ${({ size }) => (size ? size : 64)}px;
  height: ${({ size }) => (size ? size : 64)}px;
  margin-right: 25px;
`

const Value = styled<{ fontSize: number }, any>('div')`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 28)}px;
`
