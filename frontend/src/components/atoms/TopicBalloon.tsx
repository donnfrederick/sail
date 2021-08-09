import * as React from 'react'
import styled from 'styled-components'
import { sendTopicSelection } from 'utils/WebSocketClient'

interface Props {
  isClearTopic?: boolean
  text: string
  broadcastTopic?: string
}

export default (props: Props) => {
  const { isClearTopic = false, text, broadcastTopic } = props

  const handleOnClick = () => {
    const broadcast = isClearTopic || !broadcastTopic ? '' : broadcastTopic
    sendTopicSelection(broadcast)
  }

  return <Container onClick={handleOnClick}>{text}</Container>
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 244px;
  height: 244px;
  border-radius: 50%;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: normal;
  color: #ffffff;

  &:nth-child(1) {
    background-color: #ffcb1b;
    transform: translate3d(138px, 250px, 0);
  }
  &:nth-child(2) {
    background-color: #ff4e71;
    transform: translate3d(436px, 360px, 0);
  }
  &:nth-child(3) {
    background-color: #00decf;
    transform: translate3d(135px, 560px, 0);
  }
  &:nth-child(4) {
    background-color: #3495ff;
    transform: translate3d(392px, 620px, 0);
  }
`
