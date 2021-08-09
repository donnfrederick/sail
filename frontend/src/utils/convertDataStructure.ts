import * as TeachersModels from 'models/teachers'
import { transformToHobbieIds, transformToPurposeIds } from 'utils/manipulate'

export const convertInfoToTeacher = (
  info: TeachersModels.Info
): TeachersModels.Teacher => {
  return {
    desired_condition: Number(
      TeachersModels.DesiredConditionEnum[info.desiredCondition]
    ),
    email: info.email,
    hobbies: transformToHobbieIds('ja')(info.hobbies),
    name: info.name,
    password: info.password,
    picture: info.picture,
    purposes: transformToPurposeIds('ja')(info.purposes),
    sex: Number(TeachersModels.GenderEnum[info.gender])
  }
}
