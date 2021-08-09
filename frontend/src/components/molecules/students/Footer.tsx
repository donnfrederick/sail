import FooterButton from 'components/atoms/students/FooterButton'
import FooterCalendar from 'components/atoms/students/FooterCalendar'
import * as React from 'react'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'
import { isPc } from 'utils/userAgent'

export default () => {
  const mypagePath = resolvePath.page('students', 'mypage')
  const notificationPath = resolvePath.page('students', 'notifications')
  const paymentPath = '/billing/students/payment_methods/' + getAuthToken()
  // const paymentPath = '/students/payment_methods/' + getAuthToken()

  return (
    <Container>
      <FooterButton
        link={mypagePath}
        icon={
          isCurrentPath(mypagePath)
            ? resolvePath.image('students/footer/home-active@3x.png')
            : resolvePath.image('students/footer/home@3x.png')
        }
        onClick={() => {
          window.location.href = resolvePath.page('students', 'mypage')
        }}
      />
      <FooterButton
        link={notificationPath}
        icon={
          isCurrentPath(notificationPath)
            ? resolvePath.image('students/footer/notification-active@3x.png')
            : resolvePath.image('students/footer/notification@3x.png')
        }
      />
      {isPc() ? (
        <FooterButton
          link={mypagePath}
          icon={resolvePath.image('students/footer/cart.png')}
          onClick={() => {
            window.location.href = paymentPath
          }}
        />
      ) : null}
      <FooterCalendar
        link={resolvePath.page('students', 'reservations/new')}
        icon={resolvePath.image('students/footer/calendar@3x.png')}
      />
    </Container>
  )
}

const isCurrentPath = (path: string) => {
  return window.location.pathname.includes(path)
}

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding-left: 48px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 -1px 5px 0 rgba(169, 191, 205, 0.3)'};

  .is-pc & {
    width: 750px;
    right: 0;
    margin: auto;
  }
`
