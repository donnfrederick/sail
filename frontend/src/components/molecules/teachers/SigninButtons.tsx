import Button from 'components/atoms/teachers/Button'
import * as TeachersModels from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  info: TeachersModels.Info
  signinEvent(): void
}

export default (props: Props) => {
  const { info, signinEvent } = props
  return (
    <Container>
      <Button type="white" text="戻る" link={resolvePath.page('teachers')} />
      <Button
        isActive={info.email.length > 0 && info.password.length >= 8}
        type="blue"
        text="ログイン"
        onClick={signinEvent}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 640px;
  height: 148px;
  margin: 0 auto;
`
