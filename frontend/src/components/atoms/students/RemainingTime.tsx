import withConversationTimer from 'hocs/withConversationTimer'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  remainingTime: string
}

export default withConversationTimer((props: Props) => {
  const { remainingTime } = props

  return (
    <Container>
      <Text>Time Limit</Text>
      <Time
        data-color={
          isLessThan1Minute(remainingTime)
            ? 'red'
            : isLessThan5minutes(remainingTime)
              ? 'orange'
              : null
        }
      >
        {remainingTime}
      </Time>
    </Container>
  )
})

const isLessThan1Minute = (time: string) => {
  if (!time.includes(':')) {
    return false
  }

  const minutes = Number(time.split(':')[0])
  const seconds = Number(time.split(':')[1])

  return minutes < 1 || (minutes === 1 && seconds === 0)
}

const isLessThan5minutes = (time: string) => {
  if (!time.includes(':')) {
    return false
  }

  const minutes = Number(time.split(':')[0])
  const seconds = Number(time.split(':')[1])

  return minutes < 5 || (minutes === 5 && seconds === 0)
}

const Container = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  left: 0;
  width: 178px;
  height: 98px;
  margin: auto;
`

const Text = styled.div`
  margin-bottom: 8px;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;
`

const Time = styled.div`
  font-size: 64px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;

  &[data-color='orange'] {
    color: #ff7626;
  }
  &[data-color='red'] {
    color: #ff4c6a;
  }
`
