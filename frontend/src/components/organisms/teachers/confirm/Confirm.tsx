import SignUpHeading from 'components/atoms/teachers/SignUpHeading'
import SignUpInfo from 'components/atoms/teachers/SignUpInfo'
import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  step: number
  info: Info
}

export default (props: Props) => {
  const { info } = props
  const data = [
    {
      content: info.email,
      label: 'メールアドレス'
    },
    {
      content: info.name,
      label: '名前'
    },
    {
      content: info.gender,
      label: '性別'
    },
    {
      content: info.picture,
      label: '顔写真'
    },
    {
      content: info.hobbies.join('・'),
      label: '興味があること'
    },
    {
      content: info.purposes.join('\n'),
      label: '利用目的'
    },
    {
      content: info.desiredCondition,
      label: '学生への希望条件'
    }
  ]

  return (
    <Container>
      <SignUpHeading text="この内容で登録しますか？" />
      {data.map((element, index) => (
        <SignUpInfo
          key={index}
          step={index + 1}
          label={element.label}
          content={element.content}
          noBorder={isFinal(index) ? true : false}
        />
      ))}
    </Container>
  )
}

const isFinal = (index: number) => index >= 6

const Container = styled.div`
  width: 100%;
`
