// import BiographyContent from 'components/atoms/teachers/BiographyContent'
// import HorizontalLabel from 'components/atoms/teachers/HorizontalLabel'
import * as SessionsModels from 'models/sessions'
import * as React from 'react'
import styled from 'styled-components'
import {
  getGenderNames,
  getHobbieNames,
  getPurposeNames
} from 'utils/manipulate'

type BiographyItems = '性別' | '国籍' | '興味' | '利用目的'

interface Props {
  country: string
  hobbies: SessionsModels.Hobbie[]
  sex: number
  purposes: SessionsModels.Purpose[]
}

export default (props: Props) => {
  const { sex, country, hobbies, purposes } = props

  const getBiographyContent = (label: BiographyItems) => {
    if (label === '性別') {
      return getGenderNames('ja', sex)
    } else if (label === '国籍') {
      return country
    } else if (label === '興味') {
      return getHobbieNames(hobbies).join('・')
    } else if (label === '利用目的') {
      return getPurposeNames(purposes).join('\n')
    } else {
      return ''
    }
  }

  return (
    <Container>
      {biographyItems.map(item => {
        return (
          <Item key={item}>
            <Label>{item}</Label>
            <Content>{getBiographyContent(item)}</Content>
          </Item>
        )
      })}
    </Container>
  )
}

const biographyItems: BiographyItems[] = ['性別', '国籍', '興味']

const Container = styled.div`
  width: 656px;
  margin-bottom: 100px;
  font-size: 36px;
`

const Item = styled.div`
  display: flex;
  margin-bottom: 30px;
`

const Label = styled.div`
  width: 136px;
  font-weight: bold;
`

const Content = styled.div``
