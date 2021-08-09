import InputLabel from 'components/atoms/students/InputLabel'
import Selector from 'components/atoms/students/Selector'
import SelectorArrow from 'components/atoms/students/SelectorArrow'
import * as LocationsModels from 'models/locations'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

interface Props {
  currentTimezone: string
  info: StudentsModels.Info
  timezones: LocationsModels.Timezones
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { currentTimezone, info, timezones, register } = props

  const options = timezones.data.map(timezone => {
    return {
      value: timezone
    }
  })

  return (
    <Container>
      <FormattedMessage id="edit.time_zone">
        {chunks => <InputLabel text={chunks ? chunks[0] : 'Time Zone'} />}
      </FormattedMessage>
      <Selector
        options={options}
        onChange={(event: any) => {
          const input = event.target.value
          info.timezone = input
          register(info)
        }}
        defaultValue={currentTimezone}
      />
      <SelectorArrow />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: 0 auto 40px;
`
