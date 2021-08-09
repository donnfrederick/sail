import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'

import * as UserProfileModels from 'models/userProfile'
import { isTeachers } from 'utils/checkUrl'
import resolvePath from 'utils/resolvePath'

export default ({ user }: { user: UserProfileModels.UserProfile }) => {
  const buttonText = isTeachers() ? '詳細を見る' : 'Details'
  const detailLink = isTeachers() ? 'teachers' : 'students'
  const badge = isTeachers()
    ? user.grade
    : user.highly_reliable
      ? 'elder'
      : null
  return (
    <Container>
      <RoundImage
        src={user.picture_url}
        size={150}
        badge={badge}
        code={user.country_code}
      />
      <Info>
        <Name>{user.name}</Name>
        <Button
          text={buttonText}
          type="white"
          width={224}
          height={56}
          fontSize={28}
          link={resolvePath.page(detailLink, `favorites/${user.id}`)}
        />
      </Info>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 214px;
  display: flex;
  align-items: center;
  padding: 32px;
  box-sizing: border-box;
  margin-bottom: 24px;
  border-radius: 16px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px 0 rgb(5, 68, 102, 0.35)'};
`

const Info = styled.div`
  height: 100%;
  margin-left: 41px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Name = styled.p`
  color: #405766;
  font-size: 40px;
  font-weight: bold;
  margin: 0;
`
