import Button from 'components/atoms/students/Button'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Buttons>
      <Button
        type="blue"
        text="Create Account"
        width={590}
        height={88}
        marginBottom={40}
        link={resolvePath.page('students', 'signup')}
      />
      <Button
        type="white"
        text="Sign In"
        width={590}
        height={88}
        link={resolvePath.page('students', 'signin')}
      />
    </Buttons>
  )
}

const Buttons = styled.div`
  width: 590px;
  text-align: center;
  margin: 0 auto 48px;
`
