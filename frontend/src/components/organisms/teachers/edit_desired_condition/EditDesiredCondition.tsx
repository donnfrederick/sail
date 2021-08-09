import LangLevelSelect from 'components/molecules/teachers/LangLevelSelect'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { info, register } = props
  return <LangLevelSelect info={info} register={register} />
}
