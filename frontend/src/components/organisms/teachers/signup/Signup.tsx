import InputName from 'components/atoms/teachers/InputName'
import SignUpHeading from 'components/atoms/teachers/SignUpHeading'
import Steps from 'components/atoms/teachers/Steps'
import GenderSelect from 'components/molecules/teachers/GenderSelect'
import InputMailAndPassword from 'components/molecules/teachers/InputMailAndPassword'
import InterestSelect from 'components/molecules/teachers/InterestSelect'
import LangLevelSelect from 'components/molecules/teachers/LangLevelSelect'
import NamePreferenceSelect from 'components/molecules/teachers/NamePreferenceSelect'
import PhotoSelect from 'components/molecules/teachers/PhotoSelect'
import PurposeSelect from 'components/molecules/teachers/PurposeSelect'
import SignUpButtons from 'components/molecules/teachers/SignUpButtons'
import Confirm from 'components/organisms/teachers/confirm'
import ConfirmTermsModal from 'components/organisms/teachers/modal_contents/confirm_terms'
import ConfirmProfilePictureModal from 'components/organisms/teachers/modal_contents/confirm_profile_picture'
import FailSignupModal from 'components/organisms/teachers/modal_contents/fail_signup'
import { customUrlScheme } from 'constants/index'
import withTeachersHobbiesAndPurposes from 'hocs/withTeachersHobbiesAndPurposes'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import { convertInfoToTeacher } from 'utils/convertDataStructure'
import { getFcmToken } from 'utils/fcmToken'
import isWebView from 'utils/isWebView'

interface Props {
  error: any
  purposes: SessionsModels.Purpose[]
  hobbies: SessionsModels.Hobbie[]
  info: TeachersModels.Info
  step: number
  showConfirmation: boolean
  forward(step?: number): void
  back(): void
  confirm(): void
  cancel(): void
  openModal(): void
  postValidate(request: TeachersModels.ValidationRequest): Promise<void>
  register(): void
  setModalContents(contents: JSX.Element): void
}

export default withTeachersHobbiesAndPurposes((props: Props) => {
  const {
    error,
    purposes,
    hobbies,
    info,
    step,
    showConfirmation,
    forward,
    back,
    confirm,
    cancel,
    register,
    postValidate,
    openModal,
    setModalContents
  } = props

  const hasChanged = () => {
    switch (step) {
      case 1:
        return info.email.length > 0 && info.password.length >= 8
      case 2:
        const name = info.name.split(' ')
        if (name.length < 2) {
          return false
        }
        const first = name[0]
        const last = name[1]
        return !!(first && last)
      case 3:
        return true
      case 4:
        return true
      case 5:
        return Boolean(info.picture)
      case 6:
        return Boolean(info.hobbies.length)
      case 7:
        return Boolean(info.purposes.length)
      case 8:
        return Boolean(info.desiredCondition)
      default:
        return false
    }
  }

  const Buttons = (
    <SignUpButtons
      hasChanged={hasChanged()}
      step={step}
      showConfirmation={showConfirmation}
      forwardEvent={async () => {
        if (step === 1) {
          try {
            const request: TeachersModels.ValidationRequest = {
              email: info.email,
              password: info.password
            }
            await postValidate(request)
            forward(2)
          } catch (error) {
            // tslint:disable-next-line
            // Do nothing
          }
        } else if (step === 2) {
          try {
            const request: TeachersModels.ValidationRequest = {
              name: info.name
            }
            await postValidate(request)
            forward(3)
          } catch (error) {
            // tslint:disable-next-line
            // Do nothing
          }
        } else if (step === 5) {
          setModalContents(
            <ConfirmProfilePictureModal onConfirm={() => forward(6)} />
          )
          openModal()
        } else {
          forward(step + 1)
        }
      }}
      backEvent={() => back()}
      confirmEvent={() => confirm()}
      cancelEvent={() => cancel()}
      signupEvent={async () => {
        try {
          const request = convertInfoToTeacher(info)

          if (isWebView()) {
            window.location.href = customUrlScheme.getFcmToken
            request.fcm_token = await getFcmToken()
          }

          if (isWebView() && !request.fcm_token) {
            return
          }

          if (step === 8) {
            setModalContents(<ConfirmTermsModal />)
          }
        } catch (error) {
          setModalContents(<FailSignupModal />)
        }
        openModal()
      }}
    />
  )

  return showConfirmation === true ? (
    <Container>
      <Confirm />
      {Buttons}
    </Container>
  ) : (
    <Container>
      <Steps currentStep={step} stepCount={8} />
      <SignUpHeading text={headings[step - 1]} />
      {step === 1 ? (
        <InputMailAndPassword error={error} info={info} register={register} />
      ) : step === 2 ? (
        <InputName info={info} error={error} register={register} />
      ) : step === 3 ? (
        <NamePreferenceSelect info={info} register={register} />
      ) : step === 4 ? (
        <GenderSelect info={info} register={register} />
      ) : step === 5 ? (
        <PhotoSelect info={info} register={register} />
      ) : step === 6 ? (
        <InterestSelect hobbies={hobbies} info={info} register={register} />
      ) : step === 7 ? (
        <PurposeSelect purposes={purposes} info={info} register={register} />
      ) : step === 8 ? (
        <LangLevelSelect info={info} register={register} />
      ) : null}
      {Buttons}
    </Container>
  )
})

const headings = [
  'メールアドレスとパスワードを\n入力してください',
  '名前をひらがなで入力してください',
  'ディスプレイネームを選んでください',
  '性別を選んでください（任意）',
  '顔写真を登録してください',
  () => (
    <span>
      {'あなたがよく知っていることや\n興味があることを'}
      <EmphasizeText>3つ</EmphasizeText>
      {'まで選んでください'}
    </span>
  ),
  'あなたはこのサービスを通して\nどんなことをしたいですか？(複数回答可)',
  '日本語が得意か不得意か\n学生への希望条件はありますか？'
]

const Container = styled.div`
  width: 100%;
`
const EmphasizeText = styled.span`
  font-weight: bold;
  color: red;
  text-decoration: underline;
`
