import Button from 'components/atoms/teachers/Button'
import ModalTextContainer from 'components/molecules/teachers/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'
import TutorialModal from 'components/organisms/tutorial_modal'

interface Props {
  close(): void
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const { openModal, setModalContents } = props

  return (
    <Container>
      <ModalTextContainer heading={'登録できました'} />
      <ButtonContainer>
        <Button
          type="blue"
          text="はじめる"
          link={resolvePath.page('teachers', 'mypage')}
          onClick={() => {
            setModalContents(<TutorialModal />)
            openModal()
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
