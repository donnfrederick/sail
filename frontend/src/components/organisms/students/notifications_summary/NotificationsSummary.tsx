// import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/students/Button'
import TimeStamp from 'components/atoms/students/TimeStamp'
import withNotifications from 'hocs/withNotifications'
import * as NotificationModels from 'models/notification'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

interface Props {
  authToken: string
  meta: NotificationModels.Meta
  notifications: NotificationModels.Notification[]
  page: number
  forward(): void
  getNotifications(
    authToken: string,
    request: NotificationModels.NotificationsRequest
  ): void
}

export default withNotifications((props: Props) => {
  const {
    authToken,
    meta,
    notifications,
    page,
    forward,
    getNotifications
  } = props
  return (
    <Container>
      {notifications.map(notification => (
        <StyledLink
          key={notification.id}
          to={resolvePath.page('students', `notifications/${notification.id}`)}
        >
          <Summary>
            {/* <RoundImage
              src={
                notification.image_url || resolvePath.image('common/user.png')
              }
              size={128}
              marginBottom={24}
            /> */}
            <TimeStamp time={notification.notificated_at} />
            <Title>{notification.title}</Title>
            <Text>{notification.body}</Text>
          </Summary>
        </StyledLink>
      ))}
      {meta.next_page ? (
        <Button
          type="blue"
          text={'Show More'}
          width={590}
          height={88}
          fontSize={32}
          onClick={() => {
            getNotifications(authToken, {
              page: page + 1
            })
            forward()
          }}
        />
      ) : null}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const Summary = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 24px;
  padding: 48px;
  border-radius: 16px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 20px 0 rgba(5, 68, 102, 0.15)'};
  text-align: left;

  &:last-of-type {
    margin-bottom: 48px;
  }
`

const Title = styled.div`
  margin-bottom: 16px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.22;
  letter-spacing: 0.5px;
  color: #405766;
`

const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: 0.5px;
  color: #405766;
`

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
`
