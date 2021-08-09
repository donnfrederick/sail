import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import { store } from 'components/organisms/Router'
import * as React from 'react'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import clearAuthToken from 'utils/clearAuthToken'

interface Props {
  authToken: string
  close(): void
  deleteSignout(authToken: string): Promise<void>
}

export default (props: Props) => {
  const { authToken, close, deleteSignout } = props

  return (
    <Container>
      <ModalTextContainer heading={'Are you sure you want\nto sign out?'} />
      <ButtonContainer>
        <Button
          type="blue"
          text="Cancel"
          width={244}
          height={88}
          onClick={() => close()}
        />
        <Button
          type="white"
          text="Sign Out"
          width={244}
          height={88}
          onClick={async () => {
            try {
              await deleteSignout(authToken)
              clearAuthToken()
              close()
              // localStorage.clear()
              store.dispatch(push('/'))
              window.location.reload()
            } catch (error) {
              // tslint:disable-next-line
              console.error(error)
            }
          }}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
