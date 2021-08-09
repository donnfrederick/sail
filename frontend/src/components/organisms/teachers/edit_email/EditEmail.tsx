import InputMailAddress from 'components/atoms/teachers/InputMailAddress'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  error: any
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { error, info, register } = props
  return <InputMailAddress error={error} info={info} register={register} />
}
