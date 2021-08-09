import OrganizationsUserIcon from 'components/atoms/teachers/OrganizationsUserIcon'
import OrganizationsUserName from 'components/atoms/teachers/OrganizationsUserName'
import * as OrganizationsModels from 'models/organizations'
import * as React from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  teachersAuthToken: string
  users: OrganizationsModels.User[]
  getMe(authToken: string): void
}

export default (props: Props) => {
  const { teachersAuthToken, users, getMe } = props

  return (
    <UserList>
      {users.map(user => (
        <UserItem
          key={user.id}
          onClick={async () => {
            await getMe(user.auth_token)
            window.location.reload()
          }}
        >
          <OrganizationsUserIcon src={user.picture_url} />
          <OrganizationsUserName
            isSelected={user.auth_token === teachersAuthToken}
            name={user.name}
          />
        </UserItem>
      ))}
    </UserList>
  )
}

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`

const UserList = styled.ul`
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 152px 0;
  background-color: #fff;
  transform: translateY(-100%);
  animation: ${slideIn} 400ms ease 0s forwards;
`

const UserItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 135px;
`
