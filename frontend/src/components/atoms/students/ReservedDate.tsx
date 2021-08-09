import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  end: string
  start: string
}

export default (props: Props) => {
  const { end, start } = props
  const startdate = moment.parseZone(start)
  const enddate = moment.parseZone(end)

  return (
    <Container>
      <Icon
        src={resolvePath.image('students/reservation-detail/calendar@3x.png')}
      />
      <Schedule>
        <ReservedDate>{startdate.format('dddd D MMMM YYYY')}</ReservedDate>
        <Time>
          {`${startdate.format('hh:mma')} - ${enddate.format('hh:mma')}`}
        </Time>
      </Schedule>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
  color: #405766;
`

const Icon = styled.img`
  width: 44px;
  height: 44px;
  margin-right: 32px;
`

const Schedule = styled.div`
  text-align: left;
`

const ReservedDate = styled.div`
  margin-bottom: 16px;
  font-size: 36px;
  font-weight: 500;
`

const Time = styled.div`
  font-size: 32px;
  font-weight: 500;
`
