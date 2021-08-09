import Button from 'components/atoms/teachers/Button'
import UserProfile from 'components/organisms/teachers/user_profile'
import { Me } from 'models/sessions'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'
import * as SessionsModels from 'models/sessions'
import { useState } from 'react'

interface Props {
  me: Me
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
      <UserProfile user={me} type="basic" isSelf={true} />
      <Tags>Tags</Tags>
      {selected_tags
        ? selected_tags.map(
            tag =>
              tag.user_email === me.email ? <Tag>{tag.tag_name}</Tag> : null
          )
        : null}
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

const Tags = styled.h1`
  font-size: 40px;
`

const Tag = styled.h3`
  font-size: 30px;
  display: inline-block;
  margin-right: 1.5rem;
  color: #212121;
`
