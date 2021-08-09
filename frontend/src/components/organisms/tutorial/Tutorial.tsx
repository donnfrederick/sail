import { localStorage as localStorageConstant } from 'constants/index'
import scrollStopper from 'hocs/scrollStopper'
import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import resolvePath from 'utils/resolvePath'
import { isPc } from 'utils/userAgent'
import zeroPadding from 'utils/zeroPadding'

interface Props {
  shouldShow: boolean
  showConfirmation: boolean
  hide(): void
  show(): void
}

export default (props: Props) => {
  const { shouldShow, showConfirmation, hide, show } = props

  if (isShowedTutorial() === false) {
    show()
  }

  return shouldShow ? (
    <Container
      data-prepare={showConfirmation === false}
      onTouchStart={() => {
        hide()
        localStorage.setItem(localStorageConstant.SHOWED_TUTORIAL, 'true')
      }}
    >
      {showConfirmation ? <ScrollStopper /> : null}
      <Img />
      <Text>{'指を上に動かすと\nページが下に移動します。'}</Text>
    </Container>
  ) : null
}

const isShowedTutorial = () => {
  const flag = localStorage.getItem(localStorageConstant.SHOWED_TUTORIAL)
  return flag || isPc() ? true : false
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  touch-action: none;

  &[data-prepare='true'] {
    visibility: hidden;
  }
`

const ScrollStopper = styled(scrollStopper(() => <div />))``

const initialPosition = [...Array(41)]
  .map((element, index) => {
    return `center ${660 * index}px`
  })
  .join(',')

const endPosition = [...Array(41)]
  .map((element, index) => {
    return `center ${-41 * 660 + 660 * index}px`
  })
  .join(',')

const tutorialImages = [...Array(41)]
  .map((element, index) => {
    return `url(${resolvePath.image(
      `common/tutorial/tutorial_${zeroPadding(index)}.png`
    )})`
  })
  .join(',')

const tutorial = keyframes`
  0% {
    background-position: ${initialPosition};
  }
  100% {
    background-position: ${endPosition};
  }
`

const Img = styled.div`
  position: absolute;
  top: 316px;
  right: 0;
  left: 0;
  width: 150px;
  height: 660px;
  margin: auto;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: ${initialPosition};
  background-image: ${tutorialImages};
  animation: ${tutorial} 1.5s steps(41) 0s infinite;
`

const Text = styled.div`
  position: absolute;
  top: 874px;
  right: 0;
  left: 0;
  height: 120px;
  margin: auto;
  font-size: 40px;
  line-height: 1.45;
  text-align: center;
  color: #ffffff;
  white-space: pre-wrap;
`
