import * as React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  marginBottom?: number
  width?: number
}

interface Props extends ContainerProps {
  headerFontSize?: number
  subHeaderFontSize?: number
  texts: string[]
  subHeaderAlign?: 'left' | 'center'
}

export default ({
  width,
  headerFontSize,
  subHeaderFontSize,
  marginBottom,
  texts,
  subHeaderAlign
}: Props) => {
  const [header, subHeader] = texts
  return (
    <Container width={width} marginBottom={marginBottom}>
      <Heading fontSize={headerFontSize}>{header}</Heading>
      {subHeader && (
        <SubHeading fontSize={subHeaderFontSize} textAlign={subHeaderAlign}>
          {subHeader}
        </SubHeading>
      )}
    </Container>
  )
}

interface TextProps {
  fontSize?: number
}

interface SubHeadingProps extends TextProps {
  textAlign?: 'left' | 'center'
}

const Container = styled<ContainerProps, any>('div')`
  ${({ width }) => width && `width: ${width}px`};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)}px;
  display: inline-block;
`

const Heading = styled<TextProps, any>('h2')`
  margin: 0 0 30px;
  padding: 0;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 40)}px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  line-height: 1.5;
`

const SubHeading = styled<SubHeadingProps, any>('h3')`
  margin: 0 auto;
  padding: 0;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 32)}px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  line-height: 1.5;
  white-space: pre-wrap;
`
