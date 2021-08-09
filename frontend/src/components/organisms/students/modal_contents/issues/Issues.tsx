import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  lang: string | null
  // gracing: boolean | null
  token: string
  page: string
  close(): void
}

export default (props: Props) => {
  // const { lang, gracing, close } = props
  const { lang, token, page, close } = props

  const header =
    lang === null
      ? 'Your membership has expired. Update conversation package soon.'
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
  return (
    <Container>
      <ModalTextContainer heading={header} />
      <ButtonContainer>
        <Button
          type="blue"
          text={buttonName}
          width={244}
          height={88}
          fontSize={32}
          onClick={() =>
            (window.location.href =
              '/billing/students/payment_methods/' + token)
          }
        />
        {page === 'mypage' ? (
          <Button
            type="white"
            text="Close"
            width={244}
            height={88}
            fontSize={32}
            onClick={() => close()}
          />
        ) : null}

        {/* {gracing ? (
          <Button
            type="white"
            text="Close"
            width={244}
            height={88}
            fontSize={32}
            onClick={() => close()}
          />
        ) : null} */}
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
  justify-content: space-around;
  width: 100%;
  margin-top: 72px;
`
