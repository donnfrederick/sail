import * as React from 'react'
import styled from 'styled-components'

interface Props {
  date: string
  marginBottom?: number
  time: string
}

export default (props: Props) => {
  const { date, marginBottom = 0, time } = props

  return (
    <Container marginBottom={marginBottom}>
      <ReservedDate>{date}</ReservedDate>
      <ReservedTime>{time}</ReservedTime>
    </Container>
  )
}

const Container = styled<Props, any>('div')`
  margin-bottom: ${props => props.marginBottom}px;
`

const ReservedDate = styled.div`
  margin-bottom: 20px;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.27;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;
`

const ReservedTime = styled.div`
  font-size: 64px;
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;
`
