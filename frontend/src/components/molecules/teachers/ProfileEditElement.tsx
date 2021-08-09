import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  label: string
  link: string
  content: string | null
}

export default (props: Props) => {
  const { label, link, content } = props
  return (
    <Container>
      <Button
        type="red"
        text={label}
        width={352}
        height={84}
        marginBottom={24}
        fontSize={36}
        link={link}
      />
      <Content>
        {content && label === '顔写真' ? (
          <RoundImage src={content} size={200} badge="camera" code="camera" />
        ) : (
          content
        )}
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 560px;
  margin: 0 auto 72px;
`

const Content = styled.div`
  font-size: 40px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0px;
  text-align: center;
  white-space: pre-wrap;
  color: #405766;
`
