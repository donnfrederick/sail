import PartnerRow from 'components/atoms/PartnerRow'
import * as React from 'react'
import styled from 'styled-components'

export type PersonType = 'self' | 'partner'

interface Props {
  name: string | null
  person_type: PersonType
}

export default (props: Props) => {
  // name のnullチェック, これ以降は name の型が stringであることが保証される
  if (props.name === null) return null

  const nameSections: string[] = props.name.split(' ')

  return props.person_type === 'self' ? (
    <Self>{props.name}</Self>
  ) : (
    <Partner>
      <PartnerRow name_text={nameSections[0]} name_section={1} />
      {Boolean(nameSections[1]) && (
        <PartnerRow name_text={nameSections[1]} name_section={2} />
      )}
    </Partner>
  )
}

const Partner = styled.div`
  position: absolute;
  left: 32px;
  width: 200px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 32px;
  color: white;
  top: 100px;
  text-align: center;
  border-radius: 20px;
  border: 2px solid white;
  padding: 10px;
  overflow: visible;
`

const Self = styled.div`
  position: absolute;
  right: 42px;
  width: 100px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
  color: white;
  text-align: center;
  top: 35px;
  border: 2px solid white;
  padding: 10px;
  overflow: visible;
  border-radius: 20px;
`
