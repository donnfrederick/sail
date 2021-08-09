import Button from 'components/atoms/teachers/Button'
import * as TeachersModels from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import { transformToHobbieIds, transformToPurposeIds } from 'utils/manipulate'
import resolvePath from 'utils/resolvePath'

type ItemType =
  | 'email'
  | 'password'
  | 'name'
  | 'gender'
  | 'picture'
  | 'hobbies'
  | 'purposes'
  | 'desired_condition'
  | 'introduce'

interface Props {
  authToken: string
  currentPassword: string
  info: TeachersModels.Info
  type: ItemType
  patchMe(authToken: string, teacher: any): void
}

export default (props: Props) => {
  const { authToken, currentPassword, info, type, patchMe } = props

  const hasInput = () => {
    if (type === 'email') {
      return info.email.length > 0
    } else if (type === 'password') {
      return currentPassword.length >= 8 && info.password.length >= 8
    } else if (type === 'name') {
      const name = info.name.split(' ')
      return name[0].length > 0 && name[1].length > 0
    } else if (type === 'gender') {
      return !!info.gender
    } else if (type === 'picture') {
      return !!info.picture
    } else if (type === 'hobbies') {
      return info.hobbies.length > 0
    } else if (type === 'purposes') {
      return info.purposes.length > 0
    } else if (type === 'desired_condition') {
      return !!info.desiredCondition
    } else if (type === 'introduce') {
      return info.introduce.length > 0
    } else {
      return false
    }
  }

  return (
    <Container>
      <Button
        type="white"
        text="戻る"
        width={304}
        height={112}
        link={resolvePath.page('teachers', 'profile/edit')}
      />
      <Button
        type="blue"
        text="完了"
        isActive={hasInput()}
        width={304}
        height={112}
        onClick={async () => {
          try {
            await patchMe(
              authToken,
              type === 'email'
                ? { email: info.email }
                : type === 'password'
                  ? {
                      current_password: currentPassword,
                      password: info.password
                    }
                  : type === 'name'
                    ? { name: info.name }
                    : type === 'gender'
                      ? { sex: Number(TeachersModels.GenderEnum[info.gender]) }
                      : type === 'picture'
                        ? { picture: info.picture }
                        : type === 'hobbies'
                          ? {
                              hobbies: transformToHobbieIds('ja')(info.hobbies)
                            }
                          : type === 'purposes'
                            ? {
                                purposes: transformToPurposeIds('ja')(
                                  info.purposes
                                )
                              }
                            : type === 'desired_condition'
                              ? {
                                  desired_condition: Number(
                                    TeachersModels.DesiredConditionEnum[
                                      info.desiredCondition
                                    ]
                                  )
                                }
                              : type === 'introduce'
                                ? {
                                    introduce: info.introduce
                                  }
                                : null
            )
          } catch (error) {
            // tslint:disable-next-line
            console.error(error)
          }
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 56px;
  left: 0px;
  right: 0px;
  width: 640px;
  margin: 0 auto;
`
