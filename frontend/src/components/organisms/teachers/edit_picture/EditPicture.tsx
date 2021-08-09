import PhotoSelect from 'components/molecules/teachers/PhotoSelect'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { info, register } = props
  return <PhotoSelect info={info} register={register} />
}
