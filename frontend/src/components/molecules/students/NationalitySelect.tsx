import InputLabel from 'components/atoms/students/InputLabel'
import * as LocationsModels from 'models/locations'
import * as StudentsModels from 'models/students'
import styled from 'styled-components'
import React, { useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import * as reactFlagsSelect from 'constants/reactFlagsSelect'

interface Props {
  countries: LocationsModels.Countries
  currentCountry: string
  hasPhone?: boolean
  info: StudentsModels.Info
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { countries, info, register, currentCountry } = props
  const [selected, setSelected] = useState<string>('')
  const setCountryCode = (code: string) => {
    info.country = code
    register(info)
    setSelected(code)
  }

  return (
    <Container>
      <InputLabel text="Country code" />
      <ReactFlagsSelect
        countries={countries.data.map(country => country[1])}
        selected={currentCountry || selected}
        onSelect={setCountryCode}
        searchable={true}
        searchPlaceholder={reactFlagsSelect.searchPlaceholder}
        selectedSize={reactFlagsSelect.selectedSize}
        optionsSize={reactFlagsSelect.optionsSize}
        customLabels={reactFlagsSelect.customLabels}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: 0 auto 40px;
`
