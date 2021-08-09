import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
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

  const lang =
    error && error.response.data && error.response.data.lang
      ? error.response.data.lang
      : null

  const header =
    lang === null
      ? 'READY TO RESERVE! NOW CHOOSE YOUR CONVERSATION PACKAGE'
      : lang === 'thai'
        ? 'พร้อมที่จะสำรอง! ตอนนี้เลือกแพ็คเกจการแปลงของคุณ'
        : lang === 'spanish'
          ? '¡LISTO PARA RESERVAR! AHORA ELIJA SU PAQUETE DE CONVERSACIÓN'
          : lang === 'indonesian'
            ? 'SIAP UNTUK CADANGAN! SEKARANG PILIH PAKET KONVERSASI ANDA'
            : lang === 'myanmar'
              ? 'သင့်ရဲ့ကြိုတင်မှာကြားထားဘို့အဆင်သင့်! သင့်စကားဝိုင်းများအထုပ်ယခုရွေးချယ်ပါ။'
              : lang === 'vietnamese'
                ? 'SYN SÀNG ĐỂ BẢO ĐẢM! BÂY GIỜ CHỌN GÓI CHUYỂN ĐỔI CỦA BẠN'
                : 'Your membership has expired. Update conversation package soon.'

  const buttonName =
    lang === null
      ? 'Update'
      : lang === 'thai'
        ? 'ปรับปรุง'
        : lang === 'spanish'
          ? 'Actualizar'
          : lang === 'indonesian'
            ? 'Perbarui'
            : lang === 'myanmar'
              ? 'Update'
              : lang === 'vietnamese'
                ? 'Cập nhật'
                : 'Update'

  const issueError =
    error &&
    error.response.data &&
    error.response.data.error.message &&
    error.response.data.error.message.indexOf('Issue must exist') > 0

  return (
    <Container>
      <ModalTextContainer
        isError={error ? true : false}
        heading={
          shouldMoveToTop(status)
            ? 'Please sign in again'
            : error
              ? 'ERROR'
              : 'Failed to download data'
        }
        text={
          shouldMoveToTop(status)
            ? 'Move to top page'
            : error
              ? issueError
                ? header
                : ''
              : 'Please try again'
        }
      />
      <ButtonContainer>
        <Button
          type="blue"
          text={
            shouldMoveToTop(status)
              ? 'Move'
              : error
                ? issueError
                  ? buttonName
                  : 'Close'
                : 'Reload'
          }
          onClick={() => {
            if (shouldMoveToTop(status)) {
              clearAuthToken()
              store.dispatch(push(resolvePath.page('students')))
              close()
            } else if (error) {
              if (issueError) {
                window.location.href = '/guide/en#pricing'
              } else {
                close()
              }
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
