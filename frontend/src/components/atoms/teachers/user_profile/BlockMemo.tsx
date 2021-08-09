import { Report } from 'models/evaluations'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  reports: Report[]
}

export default ({ reports }: Props) => {
  moment.locale('ja')
  return (
    <Container>
      <Title>報告内容</Title>
      {reports.map((item: Report, index: number) => (
        <Report key={index}>
          <ReportDate>
            {moment.parseZone(item.timestamp).format('YYYY年M月D日(dd) HH:mm')}
          </ReportDate>
          <ReportContent>{item.report}</ReportContent>
        </Report>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding-top: 48px;
  border-top: 1px solid black;
`

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #fa6970;
`

const Report = styled.div`
  padding: 45px 0;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const ReportDate = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
`

const ReportContent = styled.div`
  font-size: 36px;
`
