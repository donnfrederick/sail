import Button from 'components/atoms/students/Button'
import EmailInput from 'components/molecules/students/EmailInput'
import PasswordInput from 'components/molecules/students/PasswordInput'
import { store } from 'components/organisms/Router'
import {
  customUrlScheme,
  localStorage as localStorageConstant
} from 'constants/index'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import { getFcmToken } from 'utils/fcmToken'
import getAuthToken from 'utils/getAuthToken'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'

interface Props {
  error: any
  info: StudentsModels.Info
  postSignin(request: SessionsModels.SigninRequest): void
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { error, info, postSignin, register } = props
  return (
    <Container>
      <InputField>
        <EmailInput error={error} info={info} register={register} />
        <PasswordInput error={error} info={info} register={register} />
      </InputField>
      <ForgotPassword to={resolvePath.page('students', 'password_reset')}>
        {'Forgot Password?'}
      </ForgotPassword>
      <Button
        isActive={info.email && info.password ? true : false}
        text="Continue"
        onClick={async () => {
          try {
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

            await postSignin(request)
            const BILLING_FLAG = localStorage.getItem(
              localStorageConstant.BILLING_FLAG
            )
            localStorage.removeItem(localStorageConstant.BILLING_FLAG)

            if (BILLING_FLAG === 'billing') {
              location.href =
                '/billing/students/points/overview/' + getAuthToken()
            } else {
              store.dispatch(push(resolvePath.page('students', 'mypage')))
            }
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
  text-align: center;
`

const InputField = styled.div`
  margin-bottom: 64px;
`

const ForgotPassword = styled(Link)`
  display: block;
  margin-bottom: 64px;
  font-size: 24px;
  text-align: center;
  color: #138efd;
`
