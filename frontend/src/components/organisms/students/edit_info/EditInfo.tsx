import Button from 'components/atoms/students/Button'
import EmailInput from 'components/molecules/students/EmailInput'
import GenderSelect from 'components/molecules/students/GenderSelect'
import IntroduceInput from 'components/molecules/students/IntroduceInput'
import JapaneseConversationLevelSelect from 'components/molecules/students/JapaneseConversationLevelSelect'
import JapaneseLevelSelect from 'components/molecules/students/JapaneseLevelSelect'
import LanguageSelect from 'components/molecules/students/LanguageSelect'
import NameInput from 'components/molecules/students/NameInput'
import NationalitySelect from 'components/molecules/students/NationalitySelect'
import PhotoSelect from 'components/molecules/students/PhotoSelect'
import TimeZoneSelect from 'components/molecules/students/TimeZoneSelect'
import FailFetching from 'components/organisms/students/modal_contents/fail_fetching'
import withLocations from 'hocs/withLocations'
import * as LocationsModels from 'models/locations'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import getCountryCode from 'utils/getCountryCode'

interface Props {
  authToken: string
  countries: LocationsModels.Countries
  error: any
  info: StudentsModels.Info
  me: SessionsModels.Me
  timezones: LocationsModels.Timezones
  openModal(): void
  patchMe(authToken: string, changes: any): void
  register(info: StudentsModels.Info): void
  setModalContents(contents: JSX.Element): void
}

export default withLocations((props: Props) => {
  const {
    authToken,
    countries,
    error,
    info,
    me,
    timezones,
    openModal,
    patchMe,
    register,
    setModalContents
  } = props

  const getChanges = () => {
    const changes = {
      conversation_level: info.conversation_level,
      country: info.country,
      email: info.email,
      introduce: info.introduce,
      level: info.level,
      name: info.name,
      name_ja: info.name_ja,
      picture: info.picture,
      sex: info.gender,
      timezone: info.timezone
    }

    Object.keys(changes).map(key => {
      if (!changes[key]) {
        delete changes[key]
      }
    })

    return changes
  }

  return (
    <Container>
      <PhotoSelect
        info={info}
        currentPicture={me.picture_url}
        register={register}
      />
      <EmailInput
        error={error}
        info={info}
        register={register}
        currentEmail={me.email}
      />
      <NameInput
        error={error}
        info={info}
        register={register}
        isJaName={false}
        myName={me.name}
      />
      <NameInput
        error={error}
        info={info}
        register={register}
        isJaName={true} // 日本語名用の入力フィールドフラグ
        myName={me.name_ja}
      />
      <GenderSelect info={info} register={register} currentGender={me.sex} />
      <NationalitySelect
        info={info}
        register={register}
        countries={countries}
        currentCountry={
          info.country || getCountryCode(countries, me.country) || ''
        }
      />
      <TimeZoneSelect
        info={info}
        register={register}
        timezones={timezones}
        currentTimezone={me.timezone}
      />
      <LanguageSelect
      // info={info}
      // register={register}
      // languages={languages}
      // currentLanguage={me.language}
      />
      <JapaneseConversationLevelSelect
        info={info}
        register={register}
        currentLevel={me.conversation_level}
      />
      <JapaneseLevelSelect
        info={info}
        register={register}
        currentLevel={me.level}
      />
      <IntroduceInput
        info={info}
        introduce={me.introduce}
        register={register}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="Save"
          width={494}
          height={88}
          fontSize={32}
          onClick={async () => {
            try {
              await patchMe(authToken, getChanges())
            } catch (error) {
              setModalContents(<FailFetching error={error} />)
              openModal()
            }
          }}
        />
      </ButtonContainer>
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 64px;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 156px;
`
