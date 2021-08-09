import InputName from 'components/atoms/teachers/InputName'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  error: any
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { error, info, register } = props
  return <InputName error={error} info={info} register={register} />
}
