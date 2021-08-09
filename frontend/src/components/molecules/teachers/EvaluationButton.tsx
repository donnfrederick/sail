import Stars from 'components/molecules/Stars'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

interface Props {
  starScore: number
  text: string
  onClick(): void
}

export default (props: Props) => {
  const { starScore, text, onClick } = props
  return (
    <EvaluationButton onClick={onClick}>
      <Stars score={starScore} size={35} marginBottom={15} />
      <EvaluationText>{text}</EvaluationText>
    </EvaluationButton>
  )
}

const EvaluationButton = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 640px;
  height: 140px;
  margin: 0 auto 32px;
  border-radius: 70px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px -10px rgba(5, 68, 102, 0.35)'};
`

const EvaluationText = styled.div`
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;
`
