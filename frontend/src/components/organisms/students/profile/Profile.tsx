import UserProfile from 'components/organisms/students/user_profile'
import * as SessionsModels from 'models/sessions'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  me: SessionsModels.Me
}

export default (props: Props) => {
  const { me } = props

  return (
    <Container>
      <UserProfile user={me} type="basic" isSelf="true" />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 136px 40px;
  color: #405766;
`
