import InputLabel from 'components/atoms/students/InputLabel'
import Selector, { Option } from 'components/atoms/students/Selector'
import SelectorArrow from 'components/atoms/students/SelectorArrow'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

interface Props {
  currentLevel: number | null
  info: StudentsModels.Info
  noDefault?: boolean
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { currentLevel, info, noDefault, register } = props

  const options: Option[] = StudentsModels.JLPTLevelArr
  const defaultValue =
    currentLevel === 0 || currentLevel === null ? '' : String(currentLevel)

  return (
    <Container>
      <FormattedMessage id="edit.jlpt">
        {chunks => <InputLabel text={chunks ? chunks[0] : 'JLPT Level'} />}
      </FormattedMessage>
      <Selector
        options={options}
        placeholder="Select Level"
        noDefault={noDefault}
        onChange={(event: any) => {
          const input = event.target.value
          info.level = Number(input)
          register(info)
        }}
        defaultValue={defaultValue}
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
