import Button from 'components/atoms/students/Button'
import SailTitle from 'components/atoms/teachers/SailTitle'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Container>
      <SailTitle />
      <ButtonContainer>
        <Button
          type="blue"
          text="日本の人"
          width={590}
          height={88}
          marginBottom={48}
          link={resolvePath.page('teachers')}
        />
        <Button
          type="blue"
          text="International People"
          width={590}
          height={88}
          link={resolvePath.page('students')}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 350px 0 0;
  text-align: center;
  background-color: #ffffff;
  .is-pc & {
    min-height: 1200px;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 132px;
  width: 100%;
  margin: auto;
`
