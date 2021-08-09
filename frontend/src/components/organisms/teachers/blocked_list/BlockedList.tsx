import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import withBlockedUsers from 'hocs/withBlockedUsers'
import * as BlocksModels from 'models/blocks'
import { UserProfile as User } from 'models/userProfile'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

interface Props {
  authToken: string
  blocks: User[]
  meta: BlocksModels.Meta
  page: number
  forward(): void
  getBlocks(
    authToken: string,
    request: BlocksModels.GetBlocksRequest
  ): Promise<void>
}

interface ButtonsProps {
  hasNext: boolean
}

export default withBlockedUsers((props: Props) => {
  const { authToken, blocks, meta, page, forward, getBlocks } = props

  if (blocks.length <= 0) {
    return <Container />
  }

  return (
    <Container>
      <List>
        {blocks.map(block => (
          <BlockedUser key={block.id}>
            <LeftSide>
              <RoundImage
                src={block.picture_url}
                size={150}
                code={block.country_code}
              />
            </LeftSide>
            <RightSide>
              <Name>{block.name}</Name>
              <Button
                type="blue"
                text="詳細"
                width={386}
                height={56}
                fontSize={28}
                noShadow={true}
                link={resolvePath.page('teachers', `blocked/${block.id}`)}
              />
            </RightSide>
          </BlockedUser>
        ))}
      </List>
      <Buttons hasNext={meta.next_page}>
        <Button
          type="white"
          text="戻る"
          width={344}
          height={112}
          fontSize={40}
          link={resolvePath.page('teachers', 'support')}
        />
        {meta.next_page ? (
          <Button
            type="blue"
            text="もっとみる"
            width={344}
            height={112}
            fontSize={40}
            onClick={() => {
              getBlocks(authToken, {
                page: page + 1
              })
              forward()
            }}
          />
        ) : null}
      </Buttons>
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
`

const List = styled.div`
  margin-bottom: 36px;
`

const BlockedUser = styled.div`
  display: flex;
  width: 736px;
  height: 210px;
  box-sizing: border-box;
  margin: 0 auto 20px;
  padding: 30px 40px;
  border-radius: 16px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px -10px rgba(5, 68, 102, 0.35)'};
`

const LeftSide = styled.div`
  width: 150px;
  height: 100%;
  margin-right: 40px;
`

const RightSide = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  padding: 5px 0;
`

const Name = styled.div`
  font-size: 36px;
  color: #405766;
  text-align: left;

  &::after {
    margin-left: 8px;
    font-size: 32px;
    content: 'さん';
  }
`

const Buttons = styled<ButtonsProps, any>('div')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 56px;
  display: flex;
  justify-content: ${props => (props.hasNext ? 'space-between' : 'center')};
  width: 720px;
  margin: 0 auto;
`
