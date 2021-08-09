import InputMailAndPassword from 'components/molecules/teachers/InputMailAndPassword'
import SigninButtons from 'components/molecules/teachers/SigninButtons'
import { store } from 'components/organisms/Router'
import { customUrlScheme } from 'constants/index'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import { getFcmToken } from 'utils/fcmToken'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'

interface Props {
  error: any
  isOrganizations?: boolean
  info: TeachersModels.Info
  openModal(): void
  postOrganizationsSignin(request: SessionsModels.SigninRequest): void
  postSignin(request: SessionsModels.SigninRequest): void
  register(): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    error,
    isOrganizations,
    info,
    postOrganizationsSignin,
    postSignin,
    register
  } = props
  return (
    <Container>
      <Img src={resolvePath.image('common/teachers@3x.png')} />
      <InputMailAndPassword
        error={error}
        info={info}
        register={register}
        marginBottom={40}
      />
      <ForgotPassword to={resolvePath.page('teachers', 'password_reset')}>
        {'パスワードを忘れた場合'}
      </ForgotPassword>
      <SigninButtons
        info={info}
        signinEvent={async () => {
          const request: SessionsModels.SigninRequest = {
            email: info.email,
            password: info.password
          }

          if (isWebView()) {
            window.location.href = customUrlScheme.getFcmToken
            request.fcm_token = await getFcmToken()
          }

          if (isWebView() && !request.fcm_token) {
            return
          }

          try {
            isOrganizations
              ? await postOrganizationsSignin(request)
              : await postSignin(request)

            store.dispatch(push(resolvePath.page('teachers', 'mypage')))
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
  width: 100%;
`

const ForgotPassword = styled(Link)`
  display: block;
  margin-bottom: 52px;
  font-size: 28px;
  text-align: center;
  color: #138efd;
`

const Img = styled.img`
  width: 338px;
  margin-bottom: 64px;
`
