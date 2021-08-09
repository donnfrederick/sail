// import moment from 'moment'
import withDefaultDatetime from 'hocs/withDefaultDatetime'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  authToken: string
  getRecommend(authToken: string, date: string): void
  // onDatetimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// const handleChange = (authToken: any, getRecommend: any, date: any) => {
//   try {
//     if (typeof date !== 'string') {
//       getRecommend(authToken, date.format('YYYY-MM-DDTHH:mm:ss'))
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

const today = new Date()
const years = [today.getFullYear(), today.getFullYear() + 1]

const pickDatetime = (authToken: string, getRecommend: any) => {
  const year = document.getElementById('datetime_1i') as HTMLSelectElement
  const yyyy = year.value
  const month = document.getElementById('datetime_2i') as HTMLSelectElement
  const mm = month.value
  const date = document.getElementById('datetime_3i') as HTMLSelectElement
  const dd = date.value
  const hour = document.getElementById('datetime_4i') as HTMLSelectElement
  const hh = hour.value
  const minute = document.getElementById('datetime_5i') as HTMLSelectElement
  const MM = minute.value
  const datetime = yyyy + '/' + mm + '/' + dd + 'T' + hh + ':' + MM + ':' + '00'
  getRecommend(authToken, datetime)
}

export default withDefaultDatetime((props: Props) => {
  const { authToken, getRecommend } = props
  return (
    <Datetime>
      <select
        id="datetime_3i"
        onChange={() => pickDatetime(authToken, getRecommend)}
      >
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
      </select>/
      <select
        id="datetime_2i"
        onChange={() => pickDatetime(authToken, getRecommend)}
      >
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>/
      <select
        id="datetime_1i"
        onChange={() => pickDatetime(authToken, getRecommend)}
      >
        <option value={years[0]}>{years[0]}</option>
        <option value={years[1]}>{years[1]}</option>
      </select>-
      <select
        id="datetime_4i"
        onChange={() => pickDatetime(authToken, getRecommend)}
      >
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
      </select>:
      <select
        id="datetime_5i"
        onChange={() => pickDatetime(authToken, getRecommend)}
      >
        <option value="00">00</option>
        <option value="30">30</option>
      </select>
    </Datetime>
  )
})

const Datetime = styled.div`
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: #f6f7fb;
    color: rgb(120, 162, 203);
    font-size: 60px;
  }
  height: 160px;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  border-color: transparent;
  color: rgb(120, 162, 203);
  background-color: rgb(228, 235, 245);
  font-weight: 500;
  font-size: 60px;
  background-color: #f6f7fb;
`
