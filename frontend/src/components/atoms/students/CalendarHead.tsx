import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'
import zeroPadding from 'utils/zeroPadding'

interface Props {
  authToken: string
  year: number
  month: number
  changeYear(year: number): void
  changeMonth(month: number): void
  getCalendar(authToken: string, year: number, month: number): void
  resetRecommendedReservations(): void
}

export default (props: Props) => {
  const {
    authToken,
    year,
    month,
    changeYear,
    changeMonth,
    getCalendar,
    resetRecommendedReservations
  } = props

  return (
    <Container>
      <Month>
        {moment(`${year}-${zeroPadding(month)}`).format('MMMM YYYY')}
      </Month>
      <LeftArrow
        src={resolvePath.image('common/left-arrow.png')}
        data-disabled={
          moment().diff(moment(`${year}-${zeroPadding(month + 1)}`), 'month') >=
          0
        }
        onClick={() => {
          if (month <= 1) {
            changeYear(year - 1)
            changeMonth(12)
            getCalendar(authToken, year - 1, 12)
          } else {
            changeMonth(month - 1)
            getCalendar(authToken, year, month - 1)
          }
          resetRecommendedReservations()
        }}
      />
      <RightArrow
        src={resolvePath.image('common/right-arrow.png')}
        onClick={() => {
          if (month >= 12) {
            changeYear(year + 1)
            changeMonth(1)
            getCalendar(authToken, year + 1, 1)
          } else {
            changeMonth(month + 1)
            getCalendar(authToken, year, month + 1)
          }
          resetRecommendedReservations()
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 112px;
  box-sizing: border-box;
  border-bottom: 1px solid #cad5db;
`

const Month = styled.div`
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: #405766;
`

const LeftArrow = styled.img`
  position: absolute;
  left: 48px;
  bottom: 32px;
  width: 20px;
  height: 34px;

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.4;
  }
`

const RightArrow = styled.img`
  position: absolute;
  right: 48px;
  bottom: 32px;
  width: 20px;
  height: 34px;

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.4;
  }
`
