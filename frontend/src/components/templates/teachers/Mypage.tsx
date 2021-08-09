import Header from 'components/molecules/teachers/Header'
import MypageInfo from 'components/organisms/teachers/mypageInfo'
import connectWebSocket from 'hocs/connectWebSocket'
import * as React from 'react'
import styled from 'styled-components'

export default connectWebSocket(() => {
  return (
    <Container>
      <MypageInfo />
      <Header hasReset={true} hasSupport={true} text="ホーム" />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-top: 128px;
  padding-bottom: 40px;
  text-align: center;
`

// const Container = styled.div`
//   position: relative;
//   width: 100%;
//   min-height: 1334px;
//   max-height: 1334px;
//   box-sizing: border-box;
//   padding-top: 128px;
//   padding-bottom: 40px;
//   text-align: center;
// `
