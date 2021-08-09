import Button from 'components/atoms/students/Button'
import PasswordInput from 'components/molecules/students/PasswordInput'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import getPasswordResetToken from 'utils/getPasswordResetToken'
import resolvePath from 'utils/resolvePath'

interface Props {
  error: any
  info: StudentsModels.Info
  isPasswordRenewed: boolean
  openModal(): void
  patchPassword(token: string, password: string): void
  register(info: StudentsModels.Info): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    error,
    info,
    isPasswordRenewed,
    openModal,
    patchPassword,
    register,
    setModalContents
  } = props

  return isPasswordRenewed ? (
    <Container>
      <Heading>{'Your password has been changed successfully.'}</Heading>
      <ButtonContainer>
        <Button
          type="blue"
          text="Continue"
          width={494}
          height={88}
          link={resolvePath.page('students', 'signin')}
        />
      </ButtonContainer>
    </Container>
  ) : (
    <Container>
      <Heading>{'Please enter your new password'}</Heading>
      <PasswordInput
        error={error}
        info={info}
        register={register}
        label={'New Password'}
      />
      <ButtonContainer>
        <Button
          type="blue"
          text="Confirm"
          width={494}
          height={88}
          isActive={info.password.length >= 8}
          onClick={async () => {
            const token = getPasswordResetToken()
            if (token) {
              try {
                await patchPassword(token, info.password)
              } catch (error) {
                // tslint:disable-next-line
                console.error(error)
                setModalContents(<FailFetchingModal />)
                openModal()
              }
            }
          }}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const Heading = styled.div`
  margin-bottom: 152px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.3;
  text-align: center;
  white-space: pre-wrap;
  color: #405766;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 56px;
  left: 0;
  width: 100%;
`
