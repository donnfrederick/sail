import InterestSelect from 'components/molecules/teachers/InterestSelect'
import withTeachersHobbiesAndPurposes from 'hocs/withTeachersHobbiesAndPurposes'
import { Hobbie } from 'models/sessions'
import { Info } from 'models/teachers'
import * as React from 'react'

interface Props {
  hobbies: Hobbie[]
  info: Info
  register(info: Info): void
}

export default withTeachersHobbiesAndPurposes((props: Props) => {
  const { hobbies, info, register } = props
  return <InterestSelect hobbies={hobbies} info={info} register={register} />
})
