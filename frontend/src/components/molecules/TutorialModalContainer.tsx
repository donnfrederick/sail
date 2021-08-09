import styled from 'styled-components'
import React from 'react'
import TutorialTitle from 'components/atoms/TutorialTitle'
import TutorialContent from 'components/atoms/TutorialContent'

interface Props {
  img: string
  text: string
  title: string
}

export default (props: Props) => {
  return (
    <CardContainer>
      <div>
        <TutorialTitle text={props.title} />
        <Img src={props.img} />
        <TutorialContent text={props.text} />
      </div>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 10px;
  height: 500px;
`

const Img = styled.img`
  width: 500px;
  margin-top: 70px;
  margin-left: 20px;
`
