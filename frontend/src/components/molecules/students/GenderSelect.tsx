import InputLabel from 'components/atoms/students/InputLabel'
import Selector, { Option } from 'components/atoms/students/Selector'
import SelectorArrow from 'components/atoms/students/SelectorArrow'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

interface Props {
  currentGender: number
  info: StudentsModels.Info
  noDefault?: boolean
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { currentGender, info, noDefault, register } = props
  return (
    <Container>
      <FormattedMessage id="edit.gender">
        {chunks => (
          <InputLabel text={chunks ? chunks[0] : 'Gender (optional)'} />
        )}
      </FormattedMessage>
      <Selector
        options={options}
        placeholder="Select Gender"
        noDefault={noDefault}
        onChange={(event: any) => {
          const input = event.target.value
          info.gender = Number(input)
          register(info)
        }}
        defaultValue={currentGender !== 0 ? String(currentGender) : ''}
      />
      <SelectorArrow />
    </Container>
  )
}

const options: Option[] = [
  {
    text: 'Male',
    value: 1
  },
  {
    text: 'Female',
    value: 2
  },
  {
    text: 'Other',
    value: 9
  }
]

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: 0 auto 40px;
`
