import GenderSelect from 'components/molecules/teachers/GenderSelect'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { info, register } = props
  return <GenderSelect info={info} register={register} />
}
