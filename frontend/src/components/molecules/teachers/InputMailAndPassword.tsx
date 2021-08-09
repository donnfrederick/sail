import InputMailAddress from 'components/atoms/teachers/InputMailAddress'
import InputPassword from 'components/atoms/teachers/InputPassword'
import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  error?: any
  info: Info
  marginBottom?: number
  register(): void
}

export default (props: Props) => {
  const { error, info, marginBottom = 80, register } = props
  return (
    <Container marginBottom={marginBottom}>
      <InputMailAddress error={error} info={info} register={register} />
      <InputPassword error={error} info={info} register={register} />
    </Container>
  )
}

const Container = styled<Props, any>('div')`
  width: 640px;
  margin: 0 auto ${props => props.marginBottom}px;
`
