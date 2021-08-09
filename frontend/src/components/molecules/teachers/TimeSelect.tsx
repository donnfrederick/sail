import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  startTime: string
  endTime: string
  type: ConversationModels.TimeSelectType
  setStart(time: string): void
  setEnd(time: string): void
}

export default (props: Props) => {
  const { startTime, endTime, type, setStart, setEnd } = props
  return type === 'from' ? (
    <Container>
      <FromSelectorView>{startTime}</FromSelectorView>
      <FromSelector
        defaultValue={startTime}
        onChange={event => setStart(event.target.value)}
      >
        {getTimeList().map(hour =>
          hour.map(element => (
            <option key={element} value={element}>
              {element}
            </option>
          ))
        )}
      </FromSelector>
      <Text>から25分間</Text>
    </Container>
  ) : (
    <Container>
      <FromView>{startTime}</FromView>
      <From
        defaultValue={startTime}
        onChange={event => {
          const value = event.target.value
          setStart(value)
          if (shouldAdjustEndTime(value, endTime)) {
            const advancedTime = advance30min(value)
            if (advancedTime) {
              setEnd(advancedTime)
            }
          }
        }}
      >
        {getTimeList().map(hour =>
          hour.map(element => (
            <option key={element} value={element}>
              {element}
            </option>
          ))
        )}
      </From>
      <FromText>から</FromText>
      <ToView>{endTime}</ToView>
      <To defaultValue={endTime} onChange={event => setEnd(event.target.value)}>
        {getTimeList().map(hour =>
          hour.map(
            element =>
              isAfterStartingTime(startTime, element) ? (
                <option key={element} value={element}>
                  {element}
                </option>
              ) : null
          )
        )}
      </To>
    </Container>
  )
}

const getTimeList = () => {
  return [...Array(24)].map((hour, index) => [`${index}:00`, `${index}:30`])
}

const shouldAdjustEndTime = (startTime: string, endTime: string) => {
  const start = moment(startTime, 'HH:mm')
  const end = moment(endTime, 'HH:mm')
  return start.diff(end) > 0
}

const advance30min = (time: string) => {
  const extractedHour = time.match(/^\d+/)
  const extractedMinute = time.match(/\d+$/)
  if (!extractedHour || !extractedMinute) {
    return
  }

  const hour = extractedHour[0]
  const minute = extractedMinute[0]

  return minute === '30' ? `${Number(hour) + 1}:00` : `${hour}:30`
}

const isAfterStartingTime = (startTime: string, currentTime: string) => {
  const start = moment(startTime, 'HH:mm')
  const current = moment(currentTime, 'HH:mm')
  return start.diff(current) < 0
}

const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  margin-bottom: 48px;
  padding-top: 45px;
  background-image: linear-gradient(307deg, #2eb1ff, #138efd);
`

const FromSelectorView = styled.div`
  position: absolute;
  top: 196px;
  left: 0;
  right: 0;
  width: 640px;
  height: 100px;
  margin: 0 auto 40px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 48px;
  line-height: 100px;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;

  &::after {
    display: block;
    position: absolute;
    top: 40px;
    right: 36px;
    width: 30px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(${resolvePath.image('teachers/selector@3x.png')});
    content: '';
  }
`

const FromSelector = styled.select`
  opacity: 0;
  position: absolute;
  top: 196px;
  left: 0;
  right: 0;
  width: 640px;
  height: 100px;
  margin: 0 auto;
  font-size: 36px;
`

const Text = styled.div`
  position: absolute;
  top: 336px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const FromView = styled.div`
  position: absolute;
  top: 138px;
  left: 0;
  right: 0;
  width: 640px;
  height: 100px;
  margin: 0 auto 40px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 48px;
  line-height: 100px;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;

  &::after {
    display: block;
    position: absolute;
    top: 40px;
    right: 36px;
    width: 30px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(${resolvePath.image('teachers/selector@3x.png')});
    content: '';
  }
`

const From = styled.select`
  opacity: 0;
  position: absolute;
  top: 138px;
  left: 0;
  right: 0;
  width: 640px;
  height: 100px;
  margin: 0 auto;
  font-size: 36px;
`

const ToView = styled.div`
  position: absolute;
  top: 362px;
  left: 0;
  right: 0;
  width: 640px;
  height: 100px;
  margin: 0 auto 40px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 48px;
  line-height: 100px;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;

  &::after {
    display: block;
    position: absolute;
    top: 40px;
    right: 36px;
    width: 30px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(${resolvePath.image('teachers/selector@3x.png')});
    content: '';
  }
`

const To = styled.select`
  opacity: 0;
  position: absolute;
  top: 362px;
  left: 0;
  right: 0;
  width: 640px;
  height: 100px;
  margin: 0 auto;
  font-size: 36px;
`

const FromText = styled.div`
  position: absolute;
  top: 278px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`
