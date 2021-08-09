import ErrorMessage from 'components/atoms/students/ErrorMessage'
import InputArea from 'components/atoms/students/InputArea'
import InputLabel from 'components/atoms/students/InputLabel'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import * as validate from 'utils/validate'
import { FormattedMessage } from 'react-intl'

interface Props {
  error?: any
  info: StudentsModels.Info
  isJaName: boolean
  myName: string
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { error, info, isJaName, myName, register } = props

  const registName = () => {
    const inputs = document.querySelectorAll(`[data-name-input-ja=${isJaName}]`)
    const values = Array.from(inputs, (input: HTMLInputElement) => input.value)
    const name = values.join(' ')
    if (isJaName) {
      info.name_ja = name
    } else {
      info.name = name
    }
    register(info)
  }

  const getFirstName = (name: string) => {
    if (name) {
      const first = name.match(/.+\s/)
      return first ? first[0] : ''
    }
    return ''
  }

  const getLastName = (name: string) => {
    if (name) {
      const last = name.match(/\s.+/)
      return last ? last[0] : ''
    }
    return ''
  }

  const hasNameError = validate.hasError('Name')(error)
  const nameErrorMessage = validate.getErrorMessage('Name')(error)

  return (
    <Container>
      <FirstName>
        <FormattedMessage id="edit.first_name">
          {chunks => (
            <InputLabel
              text={
                chunks
                  ? chunks[0] + (isJaName ? ' (Hiragana)' : '')
                  : 'First Name' + (isJaName ? ' (Hiragana)' : '')
              }
            />
          )}
        </FormattedMessage>
        <InputArea
          hasError={hasNameError}
          onInput={registName}
          isName={isJaName}
          defaultValue={getFirstName(myName)}
          noDefault={true} // 名前が空でもInputフィールドは表示させたいので、Trueで指定
          placeholder="First Name"
        />
      </FirstName>
      <LastName>
        <FormattedMessage id="edit.last_name">
          {chunks => (
            <InputLabel
              text={
                chunks
                  ? chunks[0] + (isJaName ? ' (Hiragana)' : '')
                  : 'Last Name' + (isJaName ? ' (Hiragana)' : '')
              }
            />
          )}
        </FormattedMessage>
        <InputArea
          hasError={hasNameError}
          onInput={registName}
          isName={isJaName}
          defaultValue={getLastName(myName)}
          noDefault={true} // 名前が空でもInputフィールドは表示させたいので、Trueで指定
          placeholder="Last Name"
        />
      </LastName>
      <ErrorMessage message={nameErrorMessage} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 96px;
  margin: 0 auto 40px;
`

const FirstName = styled.div`
  width: 292px;
  height: 100%;
`

const LastName = styled.div`
  width: 292px;
  height: 100%;
`
