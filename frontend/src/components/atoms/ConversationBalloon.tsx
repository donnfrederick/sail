import * as React from 'react'
import styled from 'styled-components'
import { isTeachers } from 'utils/checkUrl'
import resolvePath from 'utils/resolvePath'

interface Props {
  text: string | JSX.Element
  color?: string
  isTopic?: boolean
}

export default (props: Props) => {
  const { text, color, isTopic } = props

  return (
    <Container>
      <Img src={resolvePath.image('common/conversation-balloon.png')} />
      {isTopic ? (
        isTeachers() ? (
          <Text>
            <TeachersTopic>{text}</TeachersTopic>
          </Text>
        ) : (
          <Text>
            <StudentsTopic>{text}</StudentsTopic>
          </Text>
        )
      ) : (
        <Text color={color}>{text}</Text>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 240px;
  width: 584px;
  height: 140px;
  margin: auto;
`

const Img = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`

const Text = styled<Props, any>('div')`
  position: absolute;
  bottom: 44px;
  left: 0;
  right: 0;
  width: 100%;
  margin: auto;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: normal;
  text-align: center;
  color: ${props => (props.color ? props.color : '#405766')};
`

const TeachersTopic = styled.span`
  color: #138efd;

  &::after {
    color: #405766;
    content: ' について話す';
  }
`

const StudentsTopic = styled.span`
  color: #138efd;

  &::before {
    color: #405766;
    content: 'Talk about ';
  }
`
