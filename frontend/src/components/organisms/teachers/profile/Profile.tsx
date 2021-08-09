import Button from 'components/atoms/teachers/Button'
import UserProfile from 'components/organisms/teachers/user_profile'
import { Me } from 'models/sessions'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  me: Me
}

export default (props: Props) => {
  const { me } = props
  return (
    <Container>
      <UserProfile user={me} type="basic" isSelf={true} />
      <ButtonContainer>
        <Button
          type="white"
          text="戻る"
          width={344}
          height={112}
          fontSize={40}
          link={resolvePath.page('teachers', 'support')}
        />
        <Button
          type="white"
          text="編集する"
          width={344}
          height={112}
          fontSize={40}
          link={resolvePath.page('teachers', 'profile/edit')}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 720px;
  margin: 0 auto;
  padding: 56px;
`
