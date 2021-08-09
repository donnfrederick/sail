// import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import TimeStamp from 'components/atoms/teachers/TimeStamp'
import withNotifications from 'hocs/withNotifications'
import * as NotificationModels from 'models/notification'
import * as React from 'react'
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

interface ButtonsProps {
  hasNext: boolean
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
      <div>
        {notifications.map((notification, index) => {
          return (
            <Summary key={notification.id}>
              <LeftSideContainer />
              <RightSideContainer>
                <Title>{notification.title}</Title>
                <Text>{notification.body}</Text>
                <Button
                  type="blue"
                  text="詳細をみる"
                  width={386}
                  height={70}
                  fontSize={32}
                  noShadow={true}
                  link={resolvePath.page(
                    'teachers',
                    `notifications/${notification.id}`
                  )}
                />
                <TimeStamp time={notification.notificated_at} />
              </RightSideContainer>
            </Summary>
          )
        })}
      </div>
      <Buttons hasNext={meta.next_page}>
        <Button
          type="white"
          text="戻る"
          width={344}
          height={112}
          fontSize={40}
          link={resolvePath.page('teachers', 'mypage')}
        />
        {meta.next_page ? (
          <Button
            type="blue"
            text="もっとみる"
            width={344}
            height={112}
            fontSize={40}
            onClick={() => {
              getNotifications(authToken, {
                page: page + 1
              })
              forward()
            }}
          />
        ) : null}
      </Buttons>
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
`

const Summary = styled.div`
  display: flex;
  justify-content: center;
  width: 736px;
  box-sizing: border-box;
  margin: 0 auto 32px;
  padding: 32px;
  border-radius: 16px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px -10px rgba(5, 68, 102, 0.35)'};

  &:last-child {
    margin-bottom: 0;
  }
`

const LeftSideContainer = styled.div`
  margin-right: 32px;
`

const RightSideContainer = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  width: 592px;
`

const Title = styled.h2`
  width: 400px;
  margin: 0 0 20px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
  color: #405766;
`

const Text = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin: 0 0 20px;
  font-size: 29px;
  font-weight: 500;
  line-height: 1.24;
  letter-spacing: 0px;
  text-align: left;
  color: #405766;
  white-space: pre-wrap;
`

const Buttons = styled<ButtonsProps, any>('div')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 56px;
  display: flex;
  justify-content: ${props => (props.hasNext ? 'space-between' : 'center')};
  width: 720px;
  margin: 0 auto;
`
