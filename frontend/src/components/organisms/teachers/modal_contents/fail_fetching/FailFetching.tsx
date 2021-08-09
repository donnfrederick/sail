import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import { store } from 'components/organisms/Router'
import * as React from 'react'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import { shouldMoveToTop } from 'utils/checkStatusCode'
import clearAuthToken from 'utils/clearAuthToken'
import resolvePath from 'utils/resolvePath'

interface Props {
  error?: any
  close(): void
}

export default (props: Props) => {
  const { error, close } = props

  const status = error ? error.response.status : 200

  return (
    <Container>
      <ModalTextContainer
        heading={
          shouldMoveToTop(status)
            ? 'もう一度ログインしてください'
            : 'データの取得に失敗しました'
        }
        text={
          shouldMoveToTop(status)
            ? 'トップページに移動します'
            : 'もう一度お試しください'
        }
      />
      <ButtonContainer>
        <Button
          type="blue"
          text={shouldMoveToTop(status) ? '移動' : '再読み込み'}
          onClick={() => {
            if (shouldMoveToTop(status)) {
              clearAuthToken()
              store.dispatch(push(resolvePath.page('teachers')))
              close()
            } else {
              window.location.reload()
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
  justify-content: center;
  width: 100%;
`
