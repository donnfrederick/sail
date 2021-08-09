import FlatButton from 'components/atoms/teachers/FlatButton'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  type: ConversationModels.TimeSelectType
  onClick(type: ConversationModels.TimeSelectType): void
}

export default (props: Props) => {
  const { type, onClick } = props
  return (
    <Container>
      <FlatButton
        text={`時刻で選ぶ`}
        isSelected={type === 'from'}
        width={344}
        height={68}
        fontSize={40}
        onClick={() => onClick('from')}
      />
      <FlatButton
        text={`時間帯で選ぶ`}
        isSelected={type === 'zone'}
        width={344}
        height={68}
        fontSize={40}
        onClick={() => onClick('zone')}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 720px;
  margin: 0 auto 40px;
`
