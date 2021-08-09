import * as React from 'react'
import styled from 'styled-components'

interface Props {
  name_text: string
  name_section: number
}

export default (props: Props) => {
  const { name_text, name_section } = props

  return name_section === 0 ? (
    <PartnerRowOne>{name_text}</PartnerRowOne>
  ) : (
    <PartnerRowTwo>{name_text}</PartnerRowTwo>
  )
}

const PartnerRowOne = styled.div``

const PartnerRowTwo = styled.div`
  top: 32px;
`
