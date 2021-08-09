import ListItem from 'components/atoms/teachers/ListItem'
import Signout from 'components/atoms/teachers/Signout'
import SignoutModal from 'components/organisms/teachers/modal_contents/signout'
import * as React from 'react'
import styled from 'styled-components'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'

interface Props {
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const { openModal, setModalContents } = props

  return (
    <Container>
      <List>
        <ListItem
          text="自分の情報"
          link={resolvePath.page('teachers', 'profile')}
        />
        <ListItem
          text="会話履歴"
          link={resolvePath.page('teachers', 'history')}
        />
        <ListItem
          text="お気に入り一覧"
          link={resolvePath.page('teachers', 'favorites')}
        />
        <ListItem
          text="よくある質問"
          link={resolvePath.page('teachers', 'faq')}
        />
        <ListItem
          text="利用規約"
          link={resolvePath.page('teachers', 'terms')}
        />
        <ListItem
          text="プライバシーポリシー"
          link={resolvePath.page('teachers', 'privacy')}
        />
        {isWebView() ? (
          <ListItem
            text="ライセンス"
            link={resolvePath.page('teachers', 'license')}
          />
        ) : null}
        <ListItem
          text="運営会社について"
          link={resolvePath.page('teachers', 'about')}
        />
        <ListItem
          text="ブロックした世界の人"
          link={resolvePath.page('teachers', 'blocked')}
        />
      </List>
      <Signout
        marginBottom={205}
        onClick={() => {
          setModalContents(<SignoutModal />)
          openModal()
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const List = styled.div`
  margin-bottom: 88px;
`
