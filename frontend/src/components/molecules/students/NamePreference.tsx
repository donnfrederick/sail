import InputLabel from 'components/atoms/students/InputLabel'
import Selector, { Option } from 'components/atoms/students/Selector'
import SelectorArrow from 'components/atoms/students/SelectorArrow'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
// import { FormattedMessage } from 'react-intl'

interface Props {
  namePreference: number
  info: StudentsModels.Info
  noDefault?: boolean
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { namePreference, info, noDefault, register } = props
  return (
    <Container>
      <InputLabel text={'How Would You Like to Be Referred To?'} />
      <Selector
        options={options}
        noDefault={noDefault}
        placeholder="Please Choose One"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const input = event.target.value
          info.preferred_name = Number(input)
          register(info)
        }}
        // inputのvalueは数値でもstringになってしまう
        defaultValue={namePreference !== 0 ? String(namePreference) : ''}
      />
      <SelectorArrow />
    </Container>
  )
}

const options: Option[] = [
  {
    text: 'Full Name',
    value: 1
  },
  {
    text: 'First Name',
    value: 2
  },
  {
    text: 'Last Name',
    value: 3
  }
]

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: 0 auto 40px;
`
