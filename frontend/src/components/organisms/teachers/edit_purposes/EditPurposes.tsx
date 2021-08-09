import PurposeSelect from 'components/molecules/teachers/PurposeSelect'
import withTeachersHobbiesAndPurposes from 'hocs/withTeachersHobbiesAndPurposes'
import { Purpose } from 'models/sessions'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  info: Info
  purposes: Purpose[]
  register(info: Info): void
}

export default withTeachersHobbiesAndPurposes((props: Props) => {
  const { info, purposes, register } = props
  return <PurposeSelect info={info} purposes={purposes} register={register} />
})
