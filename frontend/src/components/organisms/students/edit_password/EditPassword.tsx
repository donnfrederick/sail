import Button from 'components/atoms/students/Button'
import PasswordInput from 'components/molecules/students/PasswordInput'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  error: any
  info: StudentsModels.Info
  patchMe(authToken: string, changes: any): void
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { authToken, error, info, patchMe, register } = props

  const getChanges = () => ({
    current_password: info.current_password,
    password: info.password
  })

  return (
    <Container>
      <PasswordInput
        error={error}
        info={info}
        isCurrentPassword={true}
        label={'Current Password'}
        register={register}
      />
      <PasswordInput
        error={error}
        info={info}
        label={'New Password'}
        register={register}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="Save"
          isActive={
            info.current_password.length >= 8 && info.password.length >= 8
          }
          onClick={async () => {
            try {
              await patchMe(authToken, getChanges())
            } catch (error) {
              // tslint:disable-next-line
            console.error(error)
            }
          }}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 64px;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 156px;
`
