import Header from 'components/molecules/teachers/Header'
import OrganizationsUserList from 'components/molecules/teachers/OrganizationsUserList'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import scrollStopper from 'hocs/scrollStopper'
import withOrganizationUsers from 'hocs/withOrganizationUsers'
import * as OrganizationsModels from 'models/organizations'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'
import resolvePath from 'utils/resolvePath'

interface Props {
  isOpened: boolean
  organizationsMe: OrganizationsModels.Me
  teachersAuthToken: string
  users: OrganizationsModels.User[]
  close(): void
  getMe(authToken: string): void
  getUsers(authToken: string): void
  open(): void
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default withOrganizationUsers((props: Props) => {
  const {
    isOpened,
    organizationsMe,
    teachersAuthToken,
    users,
    close,
    getMe,
    getUsers,
    open,
    openModal,
    setModalContents
  } = props

  const currentUser = users.find(user => user.auth_token === teachersAuthToken)

  const shouldBeHidden =
    window.location.pathname.indexOf('/teachers/conversations/') === 0 &&
    window.location.pathname.indexOf('/evaluate') > 0

  return organizationsMe.auth_token || getAuthToken(true) ? (
    shouldBeHidden ? null : isOpened ? (
      <Container>
        <ScrollStopper />
        <OrganizationsUserList
          teachersAuthToken={teachersAuthToken}
          users={users}
          getMe={getMe}
        />
        <Header text="施設利用者一覧" />
        {teachersAuthToken ? (
          <CloseButton onClick={() => close()}>閉じる</CloseButton>
        ) : null}
        {teachersAuthToken === '' ? (
          <BackButton to={'/'} onClick={() => close()}>
            一番最初に戻る
          </BackButton>
        ) : null}
      </Container>
    ) : (
      <OpenButton
        src={
          currentUser
            ? currentUser.picture_url
            : resolvePath.image('common/user@3x.png')
        }
        onClick={async () => {
          const organizationAuthToken = getAuthToken(true)
          if (organizationAuthToken) {
            try {
              await getUsers(organizationAuthToken)
              open()
            } catch (error) {
              setModalContents(<FailFetchingModal />)
              openModal()
            }
          }
        }}
      />
    )
  ) : null
})

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`

const ScrollStopper = styled(scrollStopper(() => <div />))``

const CloseButton = styled.div`
  position: fixed;
  top: 48px;
  right: 24px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #ffffff;
`

const OpenButton = styled.img`
  z-index: 100000;
  position: fixed;
  top: 20px;
  right: 232px;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: solid 2px #ffffff;
  border-radius: 50%;
`

const BackButton = styled(Link)`
  position: fixed;
  top: 18px;
  left: 24px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #ffffff;
`
