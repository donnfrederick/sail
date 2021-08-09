import TopicBalloon from 'components/atoms/TopicBalloon'
import * as ConversationModels from 'models/conversation'
import * as R from 'ramda'
import * as React from 'react'
import styled from 'styled-components'
import { isTeachers } from 'utils/checkUrl'

interface Props {
  topics: ConversationModels.Topics
}

export default (props: Props) => {
  const { topics } = props

  const topicsEn = R.keys(topics)
  const topicsJa = R.values(topics)

  return (
    <Container>
      <TopicBalloon
        isClearTopic={true}
        text={isTeachers() ? '自由に話す' : 'Talk Free'}
      />
      {(isTeachers() ? topicsJa : topicsEn).map((topic, index) => (
        <TopicBalloon
          key={topic}
          text={topic}
          broadcastTopic={topicsEn[index]}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`
