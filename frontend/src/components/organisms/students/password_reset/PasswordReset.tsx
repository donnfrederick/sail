import Button from 'components/atoms/students/Button'
import EmailInput from 'components/molecules/students/EmailInput'
import FailFetchingModal from 'components/organisms/students/modal_contents/fail_fetching'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  error: any
  info: StudentsModels.Info
  sentPasswordResetRequest: boolean
  openModal(): void
  postPassword(email: string): void
  register(info: StudentsModels.Info): void
  setModalContents(contents: JSX.Element): void
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
      <Heading>
        {
          "We've sent an email to you.\nClick the link in the email to reset your password."
        }
      </Heading>
      <ButtonContainer>
        <Button
          type="blue"
          text="Back"
          width={494}
          height={88}
          link={resolvePath.page('students', 'signin')}
        />
      </ButtonContainer>
    </Container>
  ) : (
    <Container>
      <Heading>{'Please enter your email'}</Heading>
      <EmailInput error={error} info={info} register={register} />
      <ButtonContainer>
        <Button
          type="blue"
          text="Send"
          width={494}
          height={88}
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
  margin-bottom: 208px;
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
