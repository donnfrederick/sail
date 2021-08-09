import Button from 'components/atoms/students/Button'
import * as React from 'react'
import styled from 'styled-components'
import { isStudents, isTeachers } from 'utils/checkUrl'
import resolvePath from 'utils/resolvePath'

const getUrl = () =>
  isStudents() ? '/students/mypage' : isTeachers() ? '/teachers/mypage' : '/'

const getHeading = () =>
  isStudents()
    ? 'An unexpected error occurred.'
    : isTeachers()
      ? '予期せぬエラーが発生しました'
      : '予期せぬエラーが発生しました\nAn unexpected error occurred.'

export default () => {
  return (
    <Container>
      <Heading>{getHeading()}</Heading>
      <Img src={resolvePath.image('common/maintenance@3x.png')} />
      <Button
        text={isStudents() ? 'Home' : 'ホームに戻る'}
        onClick={() => (location.href = getUrl())}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 750px;
  box-sizing: border-box;
  padding-top: 128px;
  text-align: center;
`

const Heading = styled.h1`
  margin: 0 0 165px;
  padding: 0;
  font-family: sans-serif;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: 0px;
  text-align: center;
  white-space: pre-wrap;
  color: #405766;
`

const Img = styled.img`
  width: 517px;
  height: 499px;
  margin-bottom: 80px;
`
