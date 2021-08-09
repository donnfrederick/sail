import FlatButton from 'components/atoms/teachers/FlatButton'
import { Purpose } from 'models/sessions'
import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import { getPurposeNames } from 'utils/manipulate'

interface Props {
  info: Info
  purposes: Purpose[]
  register(info: Info): void
}

export default (props: Props) => {
  const { info, purposes, register } = props

  const registPurpose = (event: any) => {
    const value = event.target.textContent
    const currentContent: string[] = info.purposes
    info.purposes = currentContent.includes(value)
      ? currentContent.filter(element => element !== value)
      : currentContent.concat([value])

    register(info)
  }
  return (
    <Container>
      {getPurposeNames(purposes).map(name => {
        return (
          <FlatButton
            key={name}
            text={name}
            isSelected={info.purposes.includes(name)}
            width={640}
            height={100}
            marginBottom={48}
            withBorder={true}
            onClick={registPurpose}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 600px;
  height: 600px;
  margin: 0 auto 48px;
`
