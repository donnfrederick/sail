import ProfileEditElement from 'components/molecules/teachers/ProfileEditElement'
import { Me } from 'models/sessions'
import { DesiredConditionEnum, GenderEnum } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'
import { getHobbieNames, getPurposeNames } from 'utils/manipulate'
import resolvePath from 'utils/resolvePath'

interface Props {
  me: Me
}

export default (props: Props) => {
  const { me } = props

  const organizationAuthToken = getAuthToken(true)

  const elements = [
    {
      content: me.picture_url,
      label: '顔写真',
      link: resolvePath.page('teachers', 'profile/edit/picture')
    },
    {
      content: me.name,
      label: '名前',
      link: resolvePath.page('teachers', 'profile/edit/name')
    },
    {
      content: GenderEnum[me.sex],
      label: '性別',
      link: resolvePath.page('teachers', 'profile/edit/gender')
    },
    {
      content: getHobbieNames(me.hobbies).join('・'),
      label: '興味があること',
      link: resolvePath.page('teachers', 'profile/edit/hobbies')
    },
    {
      content: getPurposeNames(me.purposes).join('\n'),
      label: '利用目的',
      link: resolvePath.page('teachers', 'profile/edit/purposes')
    },
    {
      content: DesiredConditionEnum[me.desired_condition],
      label: '学生への希望条件',
      link: resolvePath.page('teachers', 'profile/edit/desired_condition')
    },
    {
      content: me.email,
      label: 'メールアドレス',
      link: resolvePath.page('teachers', 'profile/edit/email')
    },
    {
      content: null,
      label: 'パスワード',
      link: resolvePath.page('teachers', 'profile/edit/password')
    },
    {
      content: me.introduce,
      label: '自己紹介',
      link: resolvePath.page('teachers', 'profile/edit/introduce')
    }
  ]

  return (
    <Container>
      {elements.map(element => {
        if (
          (element.label === 'メールアドレス' ||
            element.label === 'パスワード') &&
          organizationAuthToken
        ) {
          return false
        }

        return (
          <ProfileEditElement
            key={element.label}
            label={element.label}
            link={element.link}
            content={element.content}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 120px;
`
