import ListItem from 'components/atoms/students/ListItem'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import { FormattedMessage } from 'react-intl'

export interface Item {
  link: string
  text: string
  intlid: string
}

interface Props {
  items: Item[]
  subHeading?: string
  marginBottom?: number
}

export default (props: Props) => {
  const { items, subHeading, marginBottom = 0 } = props
  return (
    <Container>
      {subHeading ? <SubHeading>{subHeading}</SubHeading> : null}
      <List marginBottom={marginBottom}>
        {items.map(item => (
          <FormattedMessage
            key={item.text}
            id={item.intlid}
            defaultMessage={item.text}
          >
            {chunks => (
              <ListItem
                key={item.text}
                text={chunks ? chunks[0] : item.text}
                link={item.link}
              />
            )}
          </FormattedMessage>
        ))}
      </List>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const SubHeading = styled.div`
  margin-bottom: 24px;
  padding-left: 48px;
  font-size: 28px;
  font-weight: 500;
  color: #8394a0;
`

const List = styled<Props, any>('div')`
  width: 100%;
  margin-bottom: ${props => props.marginBottom}px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 6px 0 rgba(5, 68, 102, 0.1)'};
`
