import Button from 'components/atoms/teachers/Button'
import InputMailAddress from 'components/atoms/teachers/InputMailAddress'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as TeachersModels from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  error: any
  info: TeachersModels.Info
  sentPasswordResetRequest: boolean
  openModal(): void
  postPassword(email: string): void
  register(info: TeachersModels.Info): void
  setModalContents(contents: JSX.Element): void
}

interface ButtonProps {
  hasSingleButton: boolean
}

export default (props: Props) => {
  const {
    error,
    info,
    sentPasswordResetRequest,
    openModal,
    postPassword,
    register,
    setModalContents
  } = props

  return sentPasswordResetRequest ? (
    <Container>
      <Heading>{'送信が完了しました'}</Heading>
      <Text>
        {
          'パスワード再設定用のメールを送信しました。\n登録しているメールアドレスをご確認ください。'
        }
      </Text>
      <ButtonContainer hasSingleButton={true}>
        <Button
          type="white"
          text="戻る"
          width={384}
          height={112}
          link={resolvePath.page('teachers', 'signin')}
        />
      </ButtonContainer>
    </Container>
  ) : (
    <Container>
      <Heading>{'登録したメールアドレスを\n入力してください'}</Heading>
      <InputMailAddress error={error} info={info} register={register} />
      <ButtonContainer hasSingleButton={false}>
        <Button
          type="white"
          text="戻る"
          width={304}
          height={112}
          link={resolvePath.page('teachers', 'signin')}
        />
        <Button
          type="blue"
          text="送信"
          width={304}
          height={112}
          isActive={info.email.length > 0}
          onClick={async () => {
            try {
              await postPassword(info.email)
            } catch (error) {
              // tslint:disable-next-line
              console.error(error)
              setModalContents(<FailFetchingModal />)
              openModal()
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

const ButtonContainer = styled<ButtonProps, any>('div')`
  display: flex;
  justify-content: ${props =>
    props.hasSingleButton ? 'center' : 'space-between'};
  position: absolute;
  bottom: 56px;
  left: 80px;
  width: calc(100% - 80px * 2);
`
