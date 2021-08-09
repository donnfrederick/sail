import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  isOpen: boolean
  closeReportModal(): void
  onAccusationClick(): void
  onBlockClick(): void
}

export default (props: Props) => {
  const { isOpen, closeReportModal, onAccusationClick, onBlockClick } = props

  return (
    <AccusationPopup data-open={isOpen} onClick={() => closeReportModal()}>
      <AccusationItem onClick={() => onBlockClick()}>
        {'ブロックする'}
      </AccusationItem>
      <AccusationItem onClick={() => onAccusationClick()}>
        {'通報する'}
      </AccusationItem>
    </AccusationPopup>
  )
}

const popupImage = resolvePath.image('teachers/accusation-popup@3x.png')

const AccusationPopup = styled.div`
  display: flex;
  flex-flow: column;
  position: absolute;
  top: -237px;
  left: 50%;
  width: 414px;
  height: 237px;
  box-sizing: border-box;
  padding: 12px 15px 32px;
  background-size: contain;
  background-image: url(${popupImage});
  text-align: center;
  transform: translate(-50%, 0);
  transition: visibility 200ms ease-out 0s, opacity 100ms ease-out 0s,
    transform 200ms ease-out 0s;

  &[data-open='true'] {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 0);
  }

  &[data-open='false'] {
    visibility: hidden;
    opacity: 0;
    transform: translate(-50%, 40px);
  }
`

const AccusationItem = styled.div`
  width: 100%;
  height: 96px;
  font-size: 32px;
  font-weight: bold;
  color: #405766;
  line-height: 96px;
`
