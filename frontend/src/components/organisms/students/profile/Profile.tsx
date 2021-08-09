import UserProfile from 'components/organisms/students/user_profile'
import * as SessionsModels from 'models/sessions'
import * as React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

interface Props {
  me: SessionsModels.Me
  selected_tags: SessionsModels.SelectedTag[] | null
  getSelectedTag(): void
}

export default (props: Props) => {
  const { me, selected_tags, getSelectedTag } = props

  const [loaded, setLoaded] = useState(0)

  if (loaded === 0) {
    setLoaded(1)
    getSelectedTag()
  }

  return (
    <Container>
      <UserProfile user={me} type="basic" isSelf="true" />
      <Tags>Tags</Tags>
      {selected_tags
        ? selected_tags.map(
            tag =>
              tag.user_email === me.email ? <Tag>{tag.tag_name}</Tag> : null
          )
        : null}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 136px 40px;
  color: #405766;
`

const Tags = styled.h1`
  font-size: 40px;
  text-align: left;
`

const Tag = styled.h3`
  font-size: 30px;
  display: inline-block;
  margin-right: 1.5rem;
  color: #212121;
`
