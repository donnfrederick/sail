import Button from 'components/atoms/students/Button'
// import HobbieButtons from 'components/atoms/students/HobbieButtons'
// import HobbieText from 'components/atoms/students/HobbieText'
// import PurposeButtons from 'components/atoms/students/PurposeButtons'
// import PurposeText from 'components/atoms/students/PurposeText'
import SignupSteps from 'components/atoms/students/SignupSteps'
import EmailInput from 'components/molecules/students/EmailInput'
import GenderSelect from 'components/molecules/students/GenderSelect'
import JapaneseConversationLevelSelect from 'components/molecules/students/JapaneseConversationLevelSelect'
import JapaneseLevelSelect from 'components/molecules/students/JapaneseLevelSelect'
import NameInput from 'components/molecules/students/NameInput'
import NamePreference from 'components/molecules/students/NamePreference'
import PasswordInput from 'components/molecules/students/PasswordInput'
import PhoneCodeInput from 'components/molecules/students/PhoneCodeInput'
import PhoneInput from 'components/molecules/students/PhoneInput'
import PhotoSelect from 'components/molecules/students/PhotoSelect'
import TimeZoneSelect from 'components/molecules/students/TimeZoneSelect'
import { history } from 'components/organisms/Router'
import ConfirmProfilePictureModal from 'components/organisms/students/modal_contents/confirm_profile_picture'
import FailSignupModal from 'components/organisms/students/modal_contents/fail_signup'
import ConfirmTermsModal from 'components/organisms/students/modal_contents/confirm_terms'
import { customUrlScheme } from 'constants/index'
import withSignupInfo from 'hocs/withSignupInfo'
import * as LocationsModels from 'models/locations'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import React, { useState } from 'react'
import styled from 'styled-components'
import { getFcmToken } from 'utils/fcmToken'
import isWebView from 'utils/isWebView'
import { getHobbieIds, getPurposeIds } from 'utils/manipulate'

interface Props {
  countries: LocationsModels.Countries
  error: any
  hobbies: SessionsModels.Hobbie[]
  info: StudentsModels.Info
  purposes: SessionsModels.Purpose[]
  step: number
  timezones: LocationsModels.Timezones
  back(): void
  forward(step?: number): void
  postPhoneAuthentication(
    request: StudentsModels.PhoneAuthenticationRequest
  ): Promise<void>
  postPhoneCodeValidation(
    request: StudentsModels.PhoneCodeValidationRequest
  ): Promise<void>
  postValidate(request: StudentsModels.ValidationRequest): Promise<void>
  openModal(): void
  register(info: StudentsModels.Info): void
  setModalContents(contents: JSX.Element): void
}

export default withSignupInfo((props: Props) => {
  const [btnClickCount, setbtnClickCount] = useState<number>(0)

  const {
    countries,
    error,
    // hobbies,
    info,
    // purposes,
    step,
    timezones,
    back,
    forward,
    postPhoneAuthentication,
    postPhoneCodeValidation,
    postValidate,
    openModal,
    register,
    setModalContents
  } = props

  if (info.country === '') {
    info.country = countries.meta.default_country
  }
  if (info.timezone === '') {
    info.timezone = timezones.meta.default_timezone
  }

  const getStudent = () => {
    return {
      conversation_level: info.conversation_level,
      country: info.country,
      custom_gender: info.custom_gender,
      email: info.email,
      hobbies: getHobbieIds(info.hobbies),
      level: info.level,
      name: info.name,
      name_ja: info.name_ja,
      password: info.password,
      phone_number: info.phone_number,
      picture: info.picture,
      preferred_name: info.preferred_name,
      purposes: getPurposeIds(info.purposes),
      sex: info.gender,
      timezone: info.timezone
    }
  }

  return (
    <Container>
      <SignupSteps
        currentStep={step}
        stepCount={totalStep}
        onClickBackButton={
          isSatisfaction(step) ? () => history.goBack() : () => back()
        }
      />
      {step === 1 ? (
        <EmailAndPassword>
          <EmailInput
            error={error}
            info={info}
            register={register}
            currentEmail={info.email}
          />
          <PasswordInput
            error={error}
            info={info}
            register={register}
            currentPassword={info.password}
          />
        </EmailAndPassword>
      ) : step === 2 ? (
        <div>
          <PhoneInput
            error={error}
            info={info}
            register={register}
            countries={countries}
            // 戻るボタンで画面遷移する時、ページ遷移前に入力した電話番号が表示されない課題対応。
            currentPhoneNumber={info.phone_number ? info.phone_number : ''}
            noDefault={true}
          />
        </div>
      ) : step === 3 ? (
        <div>
          <PhoneCodeInput
            error={error}
            info={info}
            register={register}
            noDefault={true}
          />
        </div>
      ) : (
        /* step === 4 ? */ <div>
          <PhotoSelect
            info={info}
            currentPicture={''}
            label="Profile Photo"
            register={register}
          />
          <NameInput
            info={info}
            register={register}
            isJaName={false}
            myName={info.name}
          />
          <NameInput
            info={info}
            register={register}
            isJaName={true}
            myName={info.name_ja}
          />
          <NamePreference
            info={info}
            register={register}
            namePreference={info.preferred_name}
          />
          <GenderSelect
            info={info}
            register={register}
            currentGender={info.gender || 0}
            customGender={info.custom_gender || ''}
          />
          <TimeZoneSelect
            info={info}
            register={register}
            timezones={timezones}
            currentTimezone={info.timezone || timezones.meta.default_timezone}
          />
          <JapaneseConversationLevelSelect
            info={info}
            register={register}
            currentLevel={info.conversation_level || 0}
          />
          <JapaneseLevelSelect
            info={info}
            register={register}
            currentLevel={info.level || 0}
          />
        </div>
        // ) : step === 5 ? (
        //   <div>
        //     <HobbieText />
        //     <HobbieButtons hobbies={hobbies} info={info} register={register} />
        //   </div>
        // ) : (
        //   <div>
        //     <PurposeText />
        //     <PurposeButtons purposes={purposes} info={info} register={register} />
        //   </div>
      )}
      <ButtonContainer>
        <Button
          type="blue"
          text={isFinalStep(step) ? 'Confirm' : 'Next'}
          onClick={
            isFinalStep(step)
              ? async () => {
                  try {
                    const request: StudentsModels.Student = getStudent()

                    if (isWebView()) {
                      window.location.href = customUrlScheme.getFcmToken
                      request.fcm_token = await getFcmToken()
                    }

                    if (isWebView() && !request.fcm_token) {
                      return
                    }

                    if (isFinalStep(step)) {
                      setModalContents(<ConfirmTermsModal />)
                      openModal()
                    }
                  } catch (error) {
                    setModalContents(<FailSignupModal />)
                    openModal()
                  }
                }
              : async () => {
                  if (step === 1) {
                    try {
                      const request: StudentsModels.ValidationRequest = {
                        email: info.email,
                        password: info.password
                      }
                      await postValidate(request)
                      forward(2)
                    } catch (error) {
                      // tslint:disable-next-line
                      console.error(error)
                    }
                  } else if (step === 2) {
                    try {
                      const request: StudentsModels.PhoneAuthenticationRequest = {
                        country: info.country,
                        phone_number:
                          info.phone_number === undefined
                            ? ''
                            : info.phone_number
                      }
                      setbtnClickCount(btnClickCount + 1) // カウントの増分、状態を更新する。
                      if (btnClickCount < 1) {
                        // reducerのpostPhoneAuthentication関数の移動（データ登録、SMS送信処理）
                        await postPhoneAuthentication(request)
                      }
                      forward(3)
                      setbtnClickCount(0)
                    } catch (error) {
                      setbtnClickCount(0)
                      // tslint:disable-next-line
                      console.error(error)
                    }
                  } else if (step === 3) {
                    // Validate SMS authentication code with Rails API
                    try {
                      const request: StudentsModels.PhoneCodeValidationRequest = {
                        code: info.code === undefined ? '' : info.code,
                        country: info.country,
                        phone_number:
                          info.phone_number === undefined
                            ? ''
                            : info.phone_number
                      }
                      await postPhoneCodeValidation(request)
                      forward(4)
                    } catch (error) {
                      // tslint:disable-next-line
                      console.error(error)
                    }
                  } else if (step === 4) {
                    const validateRequest = async () => {
                      try {
                        const request: StudentsModels.ValidationRequest = {
                          name: info.name
                        }
                        await postValidate(request)
                        forward(5)
                      } catch (error) {
                        // tslint:disable-next-line
                        console.error(error)
                      }
                    }
                    setModalContents(
                      <ConfirmProfilePictureModal
                        onConfirm={() => validateRequest()}
                      />
                    )
                    openModal()
                  } else {
                    forward()
                  }
                }
          }
          isActive={hasInput(step, info, btnClickCount)}
        />
      </ButtonContainer>
    </Container>
  )
})

const totalStep = 4

const isSatisfaction = (step: number) => step === 1
const isFinalStep = (step: number) => step >= totalStep // 現在のstep数がtotalStep以上だったらTrueを返す

const hasInput = (
  step: number,
  info: StudentsModels.Info,
  btnClickCount: number
): boolean => {
  if (step === 1) {
    return info.email.length > 0 && info.password.length >= 8
  } else if (step === 2) {
    return (
      info.country !== '' &&
      info.phone_number !== undefined &&
      info.phone_number.length > 4 &&
      btnClickCount < 1 // ボタンを１回クリック後にボタンを無効にする。
    )
  } else if (step === 3) {
    return info.code !== undefined && info.code.length > 3
  } else if (step === 4) {
    return (
      info.picture !== '' &&
      info.name.length > 2 &&
      info.gender !== 0 &&
      ((info.gender === 9 && info.custom_gender !== '') || info.gender !== 9) &&
      info.country !== '' &&
      info.timezone !== '' &&
      info.conversation_level !== 0 &&
      info.level !== 0
    )
  } /* else if (step === 5) {
    return info.hobbies.length > 0
  } else if (step === 6) {
    return info.purposes.length > 0
  } */
  return false
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 64px;
`

const EmailAndPassword = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 272px;
  margin: auto;
  transform: translateY(-108px);
`

const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 100%;
  text-align: center;
`
