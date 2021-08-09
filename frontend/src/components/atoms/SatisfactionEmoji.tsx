import * as EvaluationsModels from 'models/evaluations'
import * as React from 'react'
import styled from 'styled-components'
import emojiSrc, { EmojiType } from 'utils/emojiSrc'

interface Props {
  emojiSize?: number
  fontSize?: number
  satisfaction: EvaluationsModels.Satisfaction
  type?: EmojiType
}
export default ({
  emojiSize,
  fontSize,
  satisfaction,
  type = 'active'
}: Props) => {
  const highestRatedSatisfactionKey =
    Object.keys(satisfaction).filter(key => satisfaction[key] > 0)[0] || 1
  return (
    <Container data-type={type}>
      <Emoji
        size={emojiSize}
        src={emojiSrc('active')[highestRatedSatisfactionKey]}
      />
      <Value fontSize={fontSize}>
        {satisfaction[highestRatedSatisfactionKey]}
      </Value>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 65px;
  &[data-type='basic'] {
    color: #405766;
  }
  &[data-type='white'] {
    color: #ffffff;
  }
`

const Emoji = styled<{ size: number }, any>('img')`
  width: ${({ size }) => (size ? size : 64)}px;
  height: ${({ size }) => (size ? size : 64)}px;
  margin-right: 25px;
`

const Value = styled<{ fontSize: number }, any>('div')`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 28)}px;
`
