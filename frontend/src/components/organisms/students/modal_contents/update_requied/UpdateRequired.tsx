import Button from 'components/atoms/students/Button'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import * as React from 'react'
import styled from 'styled-components'
import { isTeachers } from 'utils/checkUrl'
import { isAndroid } from 'utils/isWebView'

// tslint:disable-next-line:no-empty-interface
interface Props {}

export default (props: Props) => {
  const {} = props

  const header = isAndroid()
    ? isTeachers()
      ? 'Sailアプリのアップデートが必要です。「Playストア」を開いて"Helte Sail"で検索し、Sailアプリを選んでから更新してください。'
      : 'Sailアプリのアップデートが必要です。「Playストア」を開いて"Helte Sail"で検索し、Sailアプリを選んでから更新してください。(A new version of Sail is required. Open the Play Store and search for the app ("Helte Sail"). Then, update Sail.)'
    : isTeachers()
      ? 'Sailアプリのアップデートが必要です。App Storeを開いて"Helte Sail"で検索し、Sailアプリを選んでから更新してください。'
      : 'Sailアプリのアップデートが必要です。App Storeを開いて"Helte Sail"で検索し、Sailアプリを選んでから更新してください。(A new version of Sail is required. Open the Play Store and search for the app ("Helte Sail"). Then, update Sail.)'

  return (
    <Container>
      <ModalTextContainer heading={header} />
      <ButtonContainer>
        <Button
          type="white"
          text={isTeachers() ? '再読み込み' : 'Reload'}
          width={244}
          height={88}
          fontSize={32}
          onClick={() => window.location.reload()}
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
  justify-content: space-around;
  width: 100%;
  margin-top: 72px;
`
