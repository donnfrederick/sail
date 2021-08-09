import AccusationPopup from 'components/atoms/teachers/AccusationPopup'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  isReportModalOpen: boolean
  closeReportModal(): void
  onAccusationClick(): void
  onBlockClick(): void
  onClick(): void
}

export default (props: Props) => {
  const {
    isReportModalOpen,
    closeReportModal,
    onAccusationClick,
    onBlockClick,
    onClick
  } = props

  return (
    <Container>
      <Text onClick={() => onClick()}>不適切な行為があった場合はこちら</Text>
      <AccusationPopup
        closeReportModal={closeReportModal}
        isOpen={isReportModalOpen}
        onAccusationClick={onAccusationClick}
        onBlockClick={onBlockClick}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  text-align: center;
`

const Text = styled.span`
  font-size: 28px;
  color: #ffffff;
`
