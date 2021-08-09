import FlatButton from 'components/atoms/teachers/FlatButton'
import * as React from 'react'
import styled from 'styled-components'
import { getCurrentYear } from 'utils/calendar'

interface Props {
  authToken: string
  startMonth: number
  selectedMonth: number
  selectedYear: number
  getCalendar(authToken: string, year: number, month: number): void
  changeYear(year: number): void
  changeMonth(month: number): void
}

export default (props: Props) => {
  const {
    authToken,
    startMonth,
    selectedMonth,
    selectedYear,
    getCalendar,
    changeYear,
    changeMonth
  } = props
  return (
    <Container>
      {[...Array(limit)].map((element, index) => {
        const current = startMonth + index
        const month = current === 12 ? 12 : current % 12

        return (
          <FlatButton
            key={month}
            text={`${month}月`}
            isSelected={month === selectedMonth}
            width={156}
            height={68}
            fontSize={40}
            withBorder={true}
            onClick={() => {
              changeMonth(month)
              getCalendar(
                authToken,
                current > 12 ? selectedYear + 1 : selectedYear,
                month
              )
              if (current > 12) {
                changeYear(selectedYear + 1)
              } else {
                changeYear(getCurrentYear())
              }
            }}
          />
        )
      })}
    </Container>
  )
}

const limit = 4

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 720px;
  margin: 0 auto 40px;
`
