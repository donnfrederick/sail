import BiographyContent from 'components/atoms/teachers/BiographyContent'
import HorizontalLabel from 'components/atoms/teachers/HorizontalLabel'
import { Me } from 'models/sessions'
import { DesiredConditionEnum, GenderEnum } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import { getHobbieNames, getPurposeNames } from 'utils/manipulate'

interface Props {
  me: Me
}

export default (props: Props) => {
  const { me } = props
  const biographies = [
    {
      content: GenderEnum[me.sex],
      label: '性別'
    },
    {
      content: getHobbieNames(me.hobbies).join('・'),
      label: '興味があること'
    },
    {
      content: getPurposeNames(me.purposes).join('\n'),
      label: '利用目的'
    },
    {
      content: DesiredConditionEnum[me.desired_condition],
      label: '学生への希望条件'
    }
  ]

  return (
    <Container>
      {biographies.map(element => {
        return (
          <div key={element.label}>
            <HorizontalLabel text={element.label} />
            <BiographyContent text={element.content} />
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 656px;
  margin: 0 auto;
`
