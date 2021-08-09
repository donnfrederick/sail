import Star from 'components/atoms/Star'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  score: number
  sideMargin?: number
  size?: number
  marginBottom?: number
  setEvaluation?(evaluation: number): void
}

export default (props: Props) => {
  const { score, sideMargin, size, marginBottom, setEvaluation } = props
  return (
    <Container marginBottom={marginBottom}>
      {[...Array(getIntegerPart(score))].map((element, index) => {
        return (
          <Star
            key={index}
            type="full"
            sideMargin={sideMargin}
            size={size}
            setEvaluation={
              setEvaluation ? () => setEvaluation(index + 1) : undefined
            }
          />
        )
      })}
      {hasFractionalPart(score) ? (
        <Star type="half" sideMargin={sideMargin} size={size} />
      ) : null}
      {[
        ...Array(getRemaining(getIntegerPart(score), hasFractionalPart(score)))
      ].map((element, index) => {
        return (
          <Star
            key={index}
            type="empty"
            sideMargin={sideMargin}
            size={size}
            setEvaluation={
              setEvaluation ? () => setEvaluation(score + index + 1) : undefined
            }
          />
        )
      })}
    </Container>
  )
}

const limit = 5
const getIntegerPart = (score: number) =>
  score <= limit ? Math.floor(score) : limit
const hasFractionalPart = (score: number) =>
  score <= limit ? !!String(score).split('.')[1] : false
const getRemaining = (integer: number, hasFraction: boolean) =>
  limit - integer - (hasFraction ? 1 : 0)

const Container = styled<Props, any>('div')`
  display: flex;
  justify-content: center;
  margin: 0 auto ${props => props.marginBottom || 0}px;
`
