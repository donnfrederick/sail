import Button from 'components/atoms/teachers/Button'
import InputPassword from 'components/atoms/teachers/InputPassword'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as TeachersModels from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import getPasswordResetToken from 'utils/getPasswordResetToken'
import resolvePath from 'utils/resolvePath'

interface Props {
  error: any
  info: TeachersModels.Info
  isPasswordRenewed: boolean
  openModal(): void
  patchPassword(token: string, password: string): void
  register(info: TeachersModels.Info): void
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
      <Heading>{'新しいパスワードが設定されました'}</Heading>
      <Text>
        {
          'パスワードが正しく変更されました。\n新しいパスワードを使ってログインしてください。'
        }
      </Text>
      <ButtonContainer>
        <Button
          type="blue"
          text="ログイン"
          width={384}
          height={112}
          link={resolvePath.page('teachers', 'signin')}
        />
      </ButtonContainer>
    </Container>
  ) : (
    <Container>
      <Heading>
        {'パスワードを再設定します\n新しいパスワードを入力してください'}
      </Heading>
      <InputPassword error={error} info={info} register={register} />
      <ButtonContainer>
        <Button
          type="blue"
          text="再設定する"
          width={384}
          height={112}
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

const Text = styled.div`
  font-size: 28px;
  line-height: 1.71;
  text-align: center;
  white-space: pre-wrap;
  color: #405766;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 56px;
  left: 80px;
  width: calc(100% - 80px * 2);
`
