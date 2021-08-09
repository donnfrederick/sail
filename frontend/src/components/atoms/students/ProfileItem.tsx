import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

type Type =
  | 'gender'
  | 'location'
  | 'hobbies'
  | 'purposes'
  | 'nationality'
  | 'level'
  | 'evalPunctuality'
  | 'evalChatQuality'
  | 'evalMemo'

interface Props {
  text: string | string[]
  type: Type
}

export default (props: Props) => {
  const { text, type } = props
  return (
    <Container>
      <Icon
        src={
          type === 'gender'
            ? genderIcon
            : type === 'location'
              ? locationIcon
              : type === 'hobbies'
                ? hobbiesIcon
                : type === 'purposes'
                  ? purposesIcon
                  : type === 'nationality'
                    ? nationalityIcon
                    : type === 'level'
                      ? levelIcon
                      : type === 'evalPunctuality'
                        ? evalPunctualityIcon
                        : type === 'evalChatQuality'
                          ? evalChatQualityIcon
                          : type === 'evalMemo'
                            ? evalMemoIcon
                            : resolvePath.image(
                                'students/reservation-detail/profile@3x.png'
                              )
        }
      />
      <Text>{typeof text === 'string' ? text : concatText(text)}</Text>
    </Container>
  )
}

const genderIcon = resolvePath.image(
  'students/reservation-detail/gender@3x.png'
)
const locationIcon = resolvePath.image(
  'students/reservation-detail/location@3x.png'
)
const hobbiesIcon = resolvePath.image(
  'students/reservation-detail/hobbies@3x.png'
)
const purposesIcon = resolvePath.image(
  'students/reservation-detail/purposes@3x.png'
)
const nationalityIcon = resolvePath.image(
  'students/reservation-detail/nationality@3x.png'
)
const levelIcon = resolvePath.image('students/reservation-detail/level@3x.png')

const evalPunctualityIcon = resolvePath.image(
  'common/evaluation/punctuality@3x.png'
)
const evalChatQualityIcon = resolvePath.image(
  'common/evaluation/chat_quality@3x.png'
)
const evalMemoIcon = resolvePath.image('common/evaluation/memo@3x.png')

const concatText = (target: string[]) => {
  return target.join('\n')
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
  color: #405766;
`

const Icon = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 16px;
  flex-shrink: 0;
`

const Text = styled.div`
  padding-top: 12px;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.5px;
  color: #405766;
  white-space: pre-wrap;
  text-align: left;

  &:first-line {
    line-height: 1.25;
  }
`
