import ErrorMessage from 'components/atoms/students/ErrorMessage'
import InputArea from 'components/atoms/students/InputArea'
import InputLabel from 'components/atoms/students/InputLabel'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import * as validate from 'utils/validate'

interface Props {
  error?: any
  info: StudentsModels.Info
  isCurrentPassword?: boolean
  label?: string
  currentPassword?: string
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const {
    error,
    info,
    isCurrentPassword = false,
    label = 'Password',
    currentPassword = '',
    register
  } = props

  const hasPasswordError =
    validate.hasError('Password')(error) || validate.hasError('password')(error)
  const passwordErrorMessage =
    validate.getErrorMessage('Password')(error) ||
    validate.getErrorMessage('password')(error)

  return (
    <Container>
      <InputLabel text={label} />
      <InputArea
        hasError={hasPasswordError}
        type="password"
        placeholder={label}
        defaultValue={currentPassword}
        noDefault={true}
        onInput={(event: any) => {
          const input = event.target.value
          if (isCurrentPassword) {
            info.current_password = input.trim()
          } else {
            info.password = input.trim()
          }
          register(info)
        }}
      />
      <ErrorMessage message={passwordErrorMessage} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 624px;
  height: 96px;
  margin: 0 auto 80px;
`
