import * as EvaluationsModels from 'models/evaluations'
import { Hobbie, Purpose } from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as TeachersModels from 'models/teachers'
import * as R from 'ramda'

export type Lang = 'ja' | 'en'

export const getGenderNames = (lang: Lang, genderId: number) => {
  const genderEnum =
    lang === 'ja' ? TeachersModels.GenderEnum : StudentsModels.GenderEnum
  return genderEnum[genderId]
}

export const getHobbieIds = (hobbies: Hobbie[]) => {
  return R.map(hobbie => Number(R.prop('id', hobbie)), hobbies)
}

export const getHobbieNames = (hobbies: Hobbie[]) => {
  return R.map(hobbie => R.prop('name', hobbie), hobbies)
}

export const transformToHobbieIds = (lang: Lang) => (hobbies: string[]) => {
  return R.map(
    hobbie =>
      lang === 'ja'
        ? TeachersModels.HobbieEnum[hobbie]
        : StudentsModels.HobbieEnum[hobbie],
    hobbies
  )
}

export const getPurposeIds = (purposes: Purpose[]) => {
  return R.map(purpose => Number(R.prop('id', purpose)), purposes)
}

export const getPurposeNames = (purposes: Purpose[]) => {
  return R.map(purpose => R.prop('name', purpose), purposes)
}

export const transformToPurposeIds = (lang: Lang) => (purposes: string[]) => {
  return R.map(
    purpose =>
      lang === 'ja'
        ? TeachersModels.PurposeEnum[purpose]
        : StudentsModels.PurposeEnum[purpose],
    purposes
  )
}

export const getChatQualityNames = (lang: Lang) => (
  chatQualityValues: number[]
) => {
  const chatQualityChoices =
    lang === 'ja'
      ? EvaluationsModels.chatQualityTeacherEnum
      : EvaluationsModels.chatQualityStudentEnum
  return chatQualityValues.map((value: number) => chatQualityChoices[value])
}
