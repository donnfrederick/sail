import InputLabel from 'components/atoms/students/InputLabel'
import Selector, { Option } from 'components/atoms/students/Selector'
import SelectorArrow from 'components/atoms/students/SelectorArrow'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

interface Props {
  currentGender: number
  customGender: string
  info: StudentsModels.Info
  noDefault?: boolean
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { currentGender, customGender, info, noDefault, register } = props
  return (
    <Container>
      <Container>
        <FormattedMessage id="edit.gender">
          {chunks => (
            <InputLabel text={chunks ? chunks[0] : 'Gender (optional)'} />
          )}
        </FormattedMessage>
        <SelectorArrow />
        <Selector
          options={options}
          placeholder="Select Gender"
          noDefault={noDefault}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const input = event.target.value
            info.gender = Number(input)
            if (Number(input) === 9) {
              info.custom_gender = 'Other'
            }
            register(info)
          }}
          defaultValue={currentGender !== 0 ? String(currentGender) : ''}
        />
      </Container>
      {info.gender === 9 ||
      (customGender && !info.gender && currentGender === 9) ? (
        <Container>
          <InputLabel text={'Which Gender Do You Identify As?'} />
          <CustomGender
            width={640}
            type="text"
            placeholder="Example: Non-binary"
            maxLength={144}
            defaultValue={customGender}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              const input = event.target.value
              info.custom_gender = input.trim()
              register(info)
            }}
          />
        </Container>
      ) : null}
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
  },
  {
    text: 'Prefer Not to Say',
    value: 3
  }
]

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: 0 auto 40px;
`

const CustomGender = styled<{ width: number }, any>('textarea')`
  height: 100px;
  width: ${({ width }) => width}px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  border-color: transparent;
  color: rgb(120, 162, 203);
  background-color: rgb(228, 235, 245);
  font-weight: 500;
  font-size: 26px;
  resize: none;
`
