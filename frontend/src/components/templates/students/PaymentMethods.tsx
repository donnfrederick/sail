// import SupportHeading from 'components/atoms/students/SupportHeading'
// import SupportParagraph from 'components/atoms/students/SupportParagraph'
import Header from 'components/organisms/students/header'
import withPackages from 'hocs/withPackages'
import * as React from 'react'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'

function isAndroidDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /android/.test(userAgent)
}

export default withPackages(() => {
  return (
    <Container>
      <Header text="Payment Methods" hasBackButton={true} />
      <h1>Select your payment method</h1>
      <div>
        <a href={'/students/payment/' + getAuthToken()}>
          <img
            className="select-method"
            src="/assets/img/students/billing/cards.png"
            width="80%"
          />
        </a>
      </div>

      {isAndroidDevice() ? <div>android</div> : <div>not android</div>}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 152px 64px;
  text-align: center;
`
