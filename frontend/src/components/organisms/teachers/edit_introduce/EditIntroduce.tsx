// import InputMailAddress from 'components/atoms/teachers/InputMailAddress'
import InputIntroduce from 'components/atoms/teachers/InputIntroduce'
import { Me } from 'models/sessions'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  // error: any
  info: Info
  me: Me
  register(info: Info): void
}

export default (props: Props) => {
  const { info, me, register } = props
  return <InputIntroduce info={info} me={me} register={register} />
}
