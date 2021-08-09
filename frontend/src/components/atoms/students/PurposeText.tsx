import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <div>
      <Heading>{'What is your\npurpose of usage?'}</Heading>
      <Text>You can select more than one.</Text>
    </div>
  )
}

const Heading = styled.div`
  margin-bottom: 20px;
  font-size: 56px;
  font-weight: 500;
  line-height: 1.14;
  text-align: left;
  color: #405766;
  white-space: pre-wrap;
`

const Text = styled.div`
  margin-bottom: 128px;
  font-size: 32px;
  font-weight: 500;
  line-height: 2;
  text-align: left;
  color: #405766;
`
