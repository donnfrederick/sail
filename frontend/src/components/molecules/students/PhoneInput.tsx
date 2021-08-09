import ErrorMessage from 'components/atoms/students/ErrorMessage'
import InputArea from 'components/atoms/students/InputArea'
import InputLabel from 'components/atoms/students/InputLabel'
import NationalitySelect from 'components/molecules/students/NationalitySelect'
import * as LocationsModels from 'models/locations'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import * as validate from 'utils/validate'

interface Props {
  error?: any
  info: StudentsModels.Info
  currentPhoneNumber: string
  countries: LocationsModels.Countries
  noDefault?: boolean
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const {
    error,
    info,
    currentPhoneNumber,
    countries,
    noDefault,
    register
  } = props

  const hasPhoneError = validate.hasError('phone')(error)
  const phoneErrorMessage = validate.getErrorMessage('phone')(error)

  return (
    <Container>
      <div>
        <Small>
          Enter your mobile phone number and we will send you an SMS message
          with a verification code.
        </Small>
      </div>
      <ErrorMessage message={phoneErrorMessage} />
      <NationalitySelect
        info={info}
        register={register}
        countries={countries}
        currentCountry={info.country || countries.meta.default_country}
        hasPhone={true}
      />
      <div>
        <InputLabel text="Phone number" />
        <InputArea
          hasError={hasPhoneError}
          isName={true}
          defaultValue={currentPhoneNumber}
          noDefault={noDefault}
          placeholder="your phone number"
          onInput={(event: any) => {
            const input = event.target.value
            info.phone_number = input
            register(info)
          }}
        />
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: calc(100% - 390px) auto 0;
`

const Small = styled.small`
  display: block;
  width: 100%;
  margin: 0 auto 40px;
  font-size: 24px;
  line-height: 1.5;
  text-align: left;
`
