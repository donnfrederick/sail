import RoundImage from 'components/atoms/RoundImage'
// import SatisfactionEmoji from 'components/atoms/SatisfactionEmoji'
import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

type Status = 'request' | 'queued' | 'waiting' | 'empty'
type To = 'reservations' | 'conversations'

interface Props {
  myId?: number
  reservation?: ConversationModels.Conversation
  status: Status
  to: To
}

export default (props: Props) => {
  const { myId, reservation, status, to } = props

  const partner =
    myId && reservation
      ? reservation.users.filter(user => user.id !== myId)[0]
      : null

  const introduce = partner ? partner.introduce : null

  return (status === 'request' ||
    status === 'queued' ||
    status === 'waiting') &&
    reservation ? (
    <Link to={resolvePath.page('students', `${to}/detail/${reservation.id}`)}>
      <Container data-status={status}>
        <RoundImage
          src={
            partner ? partner.picture_url : resolvePath.image('common/user.png')
          }
          size={132}
          withBorder={true}
          badge={partner ? (partner.highly_reliable ? 'elder' : null) : null}
          code={partner ? partner.country_code : ''}
        />
        <RightSide>
          <ReservedDate>
            {getConversationDate(reservation.start_at, reservation.end_at)}
          </ReservedDate>
          <Name>{partner ? `${partner.name}` : null}</Name>
          <Introduce>
            {introduce ? `${introduce.slice(0, 36)}` : null}
          </Introduce>
        </RightSide>
      </Container>
    </Link>
  ) : status === 'empty' ? (
    <Container data-status={status}>
      <Empty>Empty</Empty>
    </Container>
  ) : null
}

const getConversationDate = (startDateTime: string, endDateTime: string) => {
  const start = moment.parseZone(startDateTime)
  const end = moment.parseZone(endDateTime)

  // return `${start.format('dddd hh:mma')} - ${end.format('hh:mma')}`
  return `${start.format('MMM Do hh:mma')} - ${end.format('hh:mma')}`
}

const verticalBorder = resolvePath.image('common/dashed-border-vertical@3x.png')
const horizontalBorder = resolvePath.image(
  'common/dashed-border-horizontal@3x.png'
)

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 686px;
  height: 238px;
  box-sizing: border-box;
  border-radius: 16px;
  margin: 0 auto 24px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 0 40px 0 rgba(5, 68, 102, 0.3)'};

  a &[data-status='queued'],
  a &[data-status='waiting'],
  a &[data-status='request'] {
    background-image: linear-gradient(289deg, #2eb1ff, #138efd);
  }
  &[data-status='empty'] {
    pointer-events: none;
    justify-content: center;
    border-radius: 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: left center, right center, center top, center bottom;
    background-size: 4px 100%, 4px 100%, 100% 4px, 100% 4px;
    background-image: url(${verticalBorder}), url(${verticalBorder}),
      url(${horizontalBorder}), url(${horizontalBorder});
    box-shadow: none;
  }
`

const RightSide = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  width: 460px;
  height: 100%;
  margin-left: 44px;
`
const Introduce = styled.div`
  line-height: 1.5;
  width: 100%;
  font-size: 26px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #ffffff;
`

const ReservedDate = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-size: 26px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #ffffff;
`

const Name = styled.div`
  width: 100%;
  margin-bottom: 15px;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: left;
  color: #ffffff;
`

// const BottomRightSide = styled.div`
//   display: flex;
//   height: 48px;
// `

// const RequestLabel = styled.div`
//   background-color: #ffffff;
//   color: #138efd;
//   font-size: 24px;
//   box-sizing: border-box;
//   height: 48px;
//   line-height: 48px;
//   font-weight: bold;
//   padding: 0 20px;
// `

const Empty = styled.div`
  margin-bottom: 24px;
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  color: #cdd5da;
`
