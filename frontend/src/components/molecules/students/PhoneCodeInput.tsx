import ErrorMessage from 'components/atoms/students/ErrorMessage'
import InputArea from 'components/atoms/students/InputArea'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import * as validate from 'utils/validate'

interface Props {
  error?: any
  info: StudentsModels.Info
  noDefault?: boolean
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { error, info, noDefault, register } = props

  const hasPhoneCodeError = validate.hasError('code')(error)
  const phoneCodeErrorMessage = validate.getErrorMessage('code')(error)

  return (
    <Container>
      <Small>
        Now a validation code has published to your phone number. You will
        receive the code in 5 minutes then input it in the below:
      </Small>
      <ErrorMessage message={phoneCodeErrorMessage} />
      <InputArea
        hasError={hasPhoneCodeError}
        isName={true}
        defaultValue=""
        noDefault={noDefault}
        placeholder="Validation code"
        onInput={(event: any) => {
          const input = event.target.value
          info.code = input
          register(info)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: calc(100% - 294px) auto 0;
`

const Small = styled.small`
  display: block;
  width: 100%;
  margin: 0 auto 40px;
  font-size: 24px;
  line-height: 1.5;
  text-align: left;
`
