import * as EvaluationsModels from 'models/evaluations'
import * as React from 'react'
import styled, { css } from 'styled-components'
import resolvePath from 'utils/resolvePath'
import { FormattedMessage } from 'react-intl'

const emojiSrc: EvaluationsModels.Satisfaction = {
  1: resolvePath.image('common/evaluation/smiley_humorous_active@2x.png'),
  2: resolvePath.image('common/evaluation/smiley_impressed_active@2x.png'),
  3: resolvePath.image('common/evaluation/smiley_discovered_active@2x.png'),
  4: resolvePath.image('common/evaluation/smiley_fine_active@2x.png')
}

interface Props {
  conversationNumber: number
  satisfaction: EvaluationsModels.Satisfaction
}

export default ({ conversationNumber, satisfaction }: Props) => (
  <Container>
    <ConversationNumber>
      <FormattedMessage id="mypage.conversation">
        {chunks => <Label>{chunks ? chunks[0] : 'Conversation'}</Label>}
      </FormattedMessage>
      <FormattedMessage id="mypage.times">
        {chunks => (
          <Value>
            {conversationNumber} {chunks ? chunks[0] : 'Times'}
          </Value>
        )}
      </FormattedMessage>
    </ConversationNumber>
    <SatisfactionLevels>
      {Object.keys(satisfaction).map((key: number | string) => (
        <SatisfactionLevel key={key}>
          <Emoji src={emojiSrc[key]} />
          <Value>{satisfaction[key]}</Value>
        </SatisfactionLevel>
      ))}
    </SatisfactionLevels>
  </Container>
)

const Container = styled.div`
  display: flex;
  margin: 0 15px;
  margin-bottom: 15px;
`

const verticalContainer = css`
  padding: 20px 0;
  flex-shrink: 0;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const ConversationNumber = styled.div`
  ${verticalContainer} padding-right: 25px;
  border-right: 1px solid black;
`

const SatisfactionLevels = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-left: 45px;
`

const SatisfactionLevel = styled.div`
  ${verticalContainer};
`

const Label = styled.div`
  font-size: 36px;
  font-weight: bold;
  line-height: 64px;
`

const Emoji = styled.img`
  height: 92px;
`

const Value = styled.div`
  margin-top: 32px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`
