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
  label?: string
  currentEmail?: string
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { error, info, label, currentEmail = '', register } = props

  const hasEmailError =
    validate.hasError('Email')(error) || validate.hasError('email')(error)
  const emailErrorMessage =
    validate.getErrorMessage('Email')(error) ||
    validate.getErrorMessage('email')(error)

  return (
    <Container>
      <InputLabel text={label || 'Email'} />
      <InputArea
        hasError={hasEmailError}
        type="email"
        placeholder="Email"
        defaultValue={currentEmail}
        noDefault={true}
        onInput={(event: any) => {
          const input = event.target.value
          info.email = input.trim()
          register(info)
        }}
      />
      <ErrorMessage message={emailErrorMessage} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 624px;
  height: 96px;
  margin: 0 auto 80px;
`
