import Button from 'components/atoms/teachers/Button'
import Footnote from 'components/atoms/teachers/Footnote'
import OrganizationsLink from 'components/atoms/teachers/OrganizationsLink'
import SigninHeader from 'components/molecules/teachers/SigninHeader'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Container>
      <Img src={resolvePath.image('common/teachers@3x.png')} />
      <Button
        type="blue"
        text="新規会員登録"
        width={528}
        height={112}
        marginBottom={40}
        link={resolvePath.page('teachers', 'signup')}
      />
      <Button
        type="white"
        text={'会員の方はこちら\nログイン'}
        width={528}
        height={112}
        marginBottom={88}
        fontSize={30}
        link={resolvePath.page('teachers', 'signin')}
      />
      <OrganizationsLink />
      <Footnote />
      <SigninHeader text="日本の人" returnPath={'/'} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 152px;
  text-align: center;
`

const Img = styled.img`
  width: 338px;
  margin-bottom: 64px;
`
