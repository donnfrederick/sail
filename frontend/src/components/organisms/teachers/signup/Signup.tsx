import InputName from 'components/atoms/teachers/InputName'
// import SignUpHeading from 'components/atoms/teachers/SignUpHeading'
import Steps from 'components/atoms/teachers/Steps'
import GenderSelect from 'components/molecules/teachers/GenderSelect'
import InputMailAndPassword from 'components/molecules/teachers/InputMailAndPassword'
import Categories from 'components/molecules/teachers/Categories'
import Tags from 'components/molecules/teachers/Tags'
import LangLevelSelect from 'components/molecules/teachers/LangLevelSelect'
import PhotoSelect from 'components/molecules/teachers/PhotoSelect'
import PurposeSelect from 'components/molecules/teachers/PurposeSelect'
import SignUpButtons from 'components/molecules/teachers/SignUpButtons'
import Confirm from 'components/organisms/teachers/confirm'
import CompleteSignupModal from 'components/organisms/teachers/modal_contents/complete_signup'
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
import { useState } from 'react'

interface Props {
  error: any
  purposes: SessionsModels.Purpose[]
  categories: SessionsModels.Category[]
  tags: SessionsModels.Tag[]
  added_tags: SessionsModels.AddedTag[]
  info: TeachersModels.Info
  step: number
  showConfirmation: boolean
  forward(step?: number): void
  back(): void
  confirm(): void
  cancel(): void
  openModal(): void
  postMe(teacher: TeachersModels.Teacher): void
  postValidate(request: TeachersModels.ValidationRequest): Promise<void>
  register(): void
  setModalContents(contents: JSX.Element): void
  postAddedTag(category: number, name: string, language: string): void
  postSelectedTag(tag: number, email: string, name: string): void
}

export default withTeachersHobbiesAndPurposes((props: Props) => {
  const {
    error,
    purposes,
    categories,
    tags,
    added_tags,
    info,
    step,
    showConfirmation,
    forward,
    back,
    confirm,
    cancel,
    register,
    postMe,
    postValidate,
    openModal,
    setModalContents,
    postAddedTag,
    postSelectedTag
  } = props

  const info_tags = info.tags
  const info_added_tags = info.added_tags

  const [loaded, setloaded] = useState(0)

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
        return !!info.picture
      case 5:
        return !!info.categories.length
      case 6:
        return !!info.tags.length
      case 7:
        return !!info.purposes.length
      case 8:
        return !!info.desiredCondition
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
        } else if (step === 4) {
          setModalContents(
            <ConfirmProfilePictureModal onConfirm={() => forward(5)} />
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

          if (loaded === 0) {
            setloaded(1)
            info_tags.map(tag =>
              postSelectedTag(tag.id, info.email, tag.name_jp)
            )
            info_added_tags.map(added_tag =>
              postSelectedTag(added_tag.id, info.email, added_tag.name_jp)
            )
          }

          await postMe(request)

          setModalContents(<CompleteSignupModal />)
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
      <Heading>{headings[step - 1]}</Heading>
      {step === 1 ? (
        <InputMailAndPassword error={error} info={info} register={register} />
      ) : step === 2 ? (
        <InputName info={info} error={error} register={register} />
      ) : step === 3 ? (
        <GenderSelect info={info} register={register} />
      ) : step === 4 ? (
        <PhotoSelect info={info} register={register} />
      ) : step === 5 ? (
        <Categories categories={categories} info={info} register={register} />
      ) : step === 6 ? (
        <Tags
          tags={tags}
          info={info}
          register={register}
          added_tags={added_tags}
          postAddedTag={postAddedTag}
        />
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
  '性別を選んでください（任意）',
  '顔写真を登録してください',
  'あなたがよく知っていることや\n興味があることを3つまで選んでください',
  'あなたはこのサービスを通して\nどんなことをしたいですか？(複数回答可)',
  '日本語が得意か不得意か\n学生への希望条件はありますか？'
]

const Container = styled.div`
  width: 100%;
`
// const EmphasizeText = styled.span`
// font-weight: bold;
// color: red;
// text-decoration: underline;
// `
const Heading = styled.h2`
  height: 94px;
  margin: 0 0 64px;
  padding: 0;
  font-size: 36px;
  font-weight: 500;
  white-space: pre-wrap;
  line-height: 1.33;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`
