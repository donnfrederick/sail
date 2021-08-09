import scrollStopper from 'hocs/scrollStopper'
import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import resolvePath from 'utils/resolvePath'
import zeroPadding from 'utils/zeroPadding'

interface Props {
  isFetchingConversation: boolean
  isFetchingLocations: boolean
  isFetchingNotification: boolean
  isFetchingOrganizations: boolean
  isFetchingStudentsMe: boolean
  isFetchingTeachersMe: boolean
  showAnyway?: boolean
}

export default (props: Props) => {
  const {
    isFetchingConversation,
    isFetchingLocations,
    isFetchingNotification,
    isFetchingOrganizations,
    isFetchingStudentsMe,
    isFetchingTeachersMe,
    showAnyway = false
  } = props
  const items = [
    isFetchingConversation,
    isFetchingLocations,
    isFetchingNotification,
    isFetchingOrganizations,
    isFetchingStudentsMe,
    isFetchingTeachersMe
  ]

  return (
    <Container
      data-hidden={isFetching(items) === false && showAnyway === false}
    >
      {isFetching(items) || showAnyway ? <ScrollStopper /> : null}
      <Img />
    </Container>
  )
}

const isFetching = (target: boolean[]) => {
  return target.includes(true)
}

const ScrollStopper = styled(scrollStopper(() => <div />))``

const initialPosition = [...Array(41)]
  .map((element, index) => {
    return `center ${250 * index}px`
  })
  .join(',')

const endPosition = [...Array(41)]
  .map((element, index) => {
    return `center ${-41 * 250 + 250 * index}px`
  })
  .join(',')

const loadingImages = [...Array(41)]
  .map((element, index) => {
    return `url(${resolvePath.image(
      `common/loading/loading_${zeroPadding(index)}.jpg`
    )})`
  })
  .join(',')

const loading = keyframes`
  0% {
    background-position: ${initialPosition};
  }
  100% {
    background-position: ${endPosition};
  }
`

const Container = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #ffffff;
  opacity: 0;
  transition: visibility 100ms linear 0ms, opacity 100ms linear 0ms;

  &[data-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: visibility 100ms linear 0ms, opacity 100ms linear 0ms;
  }
  &[data-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 0s linear 0s;
  }
`

const Img = styled.div`
  width: 250px;
  height: 250px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: ${initialPosition};
  background-image: ${loadingImages};
  animation: ${loading} 1.5s steps(41) 0s infinite;
`
