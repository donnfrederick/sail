import NamePreferenceSelect from 'components/molecules/teachers/NamePreferenceSelect'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { info, register } = props
  return <NamePreferenceSelect info={info} register={register} />
}
