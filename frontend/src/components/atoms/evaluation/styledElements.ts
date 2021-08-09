import styled from 'styled-components'

export const Header = styled<{ paddingTop?: number }, any>('div')`
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : 0)}px;
  margin: 0 40px;
`

export const FooterContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`

interface ContainerProps {
  width?: number
  marginTop?: number
}

export const MainContentContainer = styled<ContainerProps, any>('div')`
  height: 100%;
  width: ${({ width }) => (width ? `${width}px` : 'fit-content')};
  margin: 0 auto;
  margin-top: ${({ marginTop }) =>
    typeof marginTop === 'number' ? marginTop : 100}px;
`
