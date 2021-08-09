import RoundImage from 'components/atoms/RoundImage'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  step: number
  label: string
  content: any
  noBorder?: boolean
}

export default (props: Props) => {
  const { step, label, content, noBorder } = props
  return (
    <Container data-no-border={noBorder}>
      <Step>{step}</Step>
      <Label>{label}</Label>
      <Content>
        {isPhoto(label) ? (
          <RoundImage
            src={content}
            size={240}
            marginBottom={0}
            badge="camera"
            code="camera"
          />
        ) : (
          content
        )}
      </Content>
    </Container>
  )
}

const isPhoto = (label: string) => label === '顔写真'

const Container = styled.div`
  position: relative;
  width: 656px;
  min-height: 140px;
  box-sizing: border-box;
  margin: 0 auto;
  padding-bottom: 80px;
  border-left: 4px solid #138efd;

  &[data-no-border='true'] {
    border-left: 4px solid transparent;
  }
`

const Label = styled.div`
  position: relative;
  left: 64px;
  height: 48px;
  margin-bottom: 8px;
  font-size: 32px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0px;
  text-align: left;
  color: #138efd;
`

const Step = styled.div`
  position: absolute;
  top: 0;
  left: -26px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #138efd;
  font-size: 32px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const Content = styled.div`
  box-sizing: border-box;
  padding-left: 64px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  color: #405766;
  white-space: pre-wrap;
`
