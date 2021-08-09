import Button from 'components/atoms/teachers/Button'
import HorizontalLabel from 'components/atoms/teachers/HorizontalLabel'
import Calendar from 'components/molecules/teachers/Calendar'
import MonthButtons from 'components/molecules/teachers/MonthButtons'
import TimeSelect from 'components/molecules/teachers/TimeSelect'
import TimeSelectButtons from 'components/molecules/teachers/TimeSelectButtons'
import FailFetchingModal from 'components/organisms/teachers/modal_contents/fail_fetching'
import FailReserve from 'components/organisms/teachers/modal_contents/fail_reserve'
// import ModalHelpRequestConversation from 'components/organisms/teachers/modal_contents/help_request_conversation'
import ModalContentsReservation from 'components/organisms/teachers/modal_contents/reservation'
import withInitMonthAndDateSelection from 'hocs/withInitMonthAndDateSelection'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import { getCurrentMonth } from 'utils/calendar'
import resolvePath from 'utils/resolvePath'

interface Props {
  auth_token: string
  calendar: ConversationModels.Calendar
  endTime: string
  // reservationType: ConversationModels.ReservationType
  selectedDate: string
  selectedMonth: number
  selectedYear: number
  startTime: string
  timeSelect: ConversationModels.TimeSelectType
  changeMonth(month: number): void
  changeTimeSelect(type: ConversationModels.TimeSelectType): void
  changeYear(year: number): void
  getCalendar(authToken: string, year: number, month: number): void
  openModal(): void
  postConversations(
    authToken: string,
    request: ConversationModels.Request
  ): void
  selectEndTime(time: string): void
  selectDate(date: string): void
  selectStartTime(time: string): void
  setModalContents(contents: JSX.Element): void
  // setReservationType(reservationType: ConversationModels.ReservationType): void
}

export default withInitMonthAndDateSelection((props: Props) => {
  const {
    auth_token,
    calendar,
    endTime,
    // reservationType,
    selectedDate,
    selectedMonth,
    selectedYear,
    startTime,
    timeSelect,
    changeMonth,
    changeTimeSelect,
    changeYear,
    getCalendar,
    openModal,
    postConversations,
    selectEndTime,
    selectDate,
    selectStartTime,
    setModalContents
    // setReservationType
  } = props

  // const [isTimeSelected, setIsTimeSelected] = React.useState(false)

  const getRequestJson = () => {
    return {
      // accepting_requests: reservationType === 'request' ? 1 : 0,
      accepting_requests: 0,
      end_at: `${selectedDate} ${
        timeSelect === 'from' ? advance25min(startTime) : endTime
      }:00`,
      start_at: `${selectedDate} ${startTime}:00`
    }
  }

  const postReservation = async () => {
    try {
      await postConversations(auth_token, getRequestJson())
      setModalContents(<ModalContentsReservation />)
    } catch (error) {
      const isScheduleAlreadyBooked = error.response.status === 406
      if (isScheduleAlreadyBooked) {
        setModalContents(<FailReserve error={error} />)
      } else {
        setModalContents(<FailFetchingModal error={error} />)
      }
    }
    openModal()
  }

  // #Disabled as this is Request function.
  // const SelectButtonInner = (text: string, isActive: boolean) => {
  //   return (
  //     <Selectbox>
  //       <SelectboxImage
  //         src={resolvePath.image(
  //           `common/checkbox-${isActive ? 'selected' : 'unselected'}.png`
  //         )}
  //       />
  //       <SelectboxText>{text}</SelectboxText>
  //     </Selectbox>
  //   )
  // }

  // #Disabled as this is Request function.
  // const SelectButton = (type: ConversationModels.ReservationType) => {
  //   const buttonText = type === 'anyone' ? 'A: 通常予約' : 'B: リクエスト予約'
  //   const isActive = type === reservationType

  //   return isActive ? (
  //     <SelectButtonOuter>
  //       <Button
  //         type="white"
  //         width={540}
  //         height={80}
  //         fontSize={36}
  //         text={SelectButtonInner(buttonText, true)}
  //       />
  //     </SelectButtonOuter>
  //   ) : (
  //     <SelectButtonOuter onClick={() => setReservationType(type)}>
  //       {SelectButtonInner(buttonText, false)}
  //     </SelectButtonOuter>
  //   )
  // }

  return selectedDate ? (
    <Container>
      <Heading>世界の人と話したい時間を選んでください</Heading>
      <HorizontalLabel text={formatDate(selectedDate)} width={720} />
      <TimeSelectButtons type={timeSelect} onClick={changeTimeSelect} />
      <TimeSelect
        startTime={startTime}
        endTime={endTime}
        type={timeSelect}
        setStart={selectStartTime}
        setEnd={selectEndTime}
      />
      <ButtonContainer>
        <Button type="white" text="戻る" onClick={() => selectDate('')} />
        <Button type="blue" text="予約する" onClick={postReservation} />
      </ButtonContainer>
    </Container>
  ) : (
    <Container>
      <Heading>世界の人と話したい日にちを選んでください</Heading>
      <HorizontalLabel
        text={selectedDate ? formatDate(selectedDate) : `${selectedYear}年`}
        width={720}
      />
      <MonthButtons
        authToken={auth_token}
        startMonth={getCurrentMonth()}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        getCalendar={getCalendar}
        changeYear={changeYear}
        changeMonth={changeMonth}
      />
      <Calendar
        calendar={calendar}
        year={selectedYear}
        month={selectedMonth}
        selectDate={selectDate}
      />
      <Button
        type="white"
        text="戻る"
        link={resolvePath.page('teachers', 'mypage')}
      />
    </Container>
  )

  // return isTimeSelected ? (
  //   <Container>
  //     <Heading>予約方法を選んでください</Heading>
  //     <HorizontalLabel text={formatDate(selectedDate)} width={720} />
  //     <HorizontalLabel
  //       text={`${startTime}${
  //         timeSelect === 'zone'
  //           ? '〜' + endTime
  //           : ' - ' + advance25min(startTime)
  //       }`}
  //       width={720}
  //     />
  //     <Description>
  //       {
  //         'あなたの承認が必要な「リクエスト予約」と、承認不要の「通常予約」があります。'
  //       }
  //     </Description>
  //     <SelectButtonContainer>
  //       {SelectButton('anyone')}
  //       {SelectButton('request')}
  //     </SelectButtonContainer>
  //     <Help
  //       onClick={() => {
  //         setModalContents(<ModalHelpRequestConversation />)
  //         openModal()
  //       }}
  //     >
  //       {'予約方法の詳しい説明はこちら'}
  //     </Help>
  //     <ButtonContainer>
  //       <Button
  //         type="white"
  //         text="戻る"
  //         onClick={() => setIsTimeSelected(false)}
  //       />
  //       <Button type="blue" text="予約する" onClick={postReservation} />
  //     </ButtonContainer>
  //   </Container>
  // ) : selectedDate ? (
  //   <Container>
  //     <Heading>学生と話したい時間を選んでください</Heading>
  //     <HorizontalLabel text={formatDate(selectedDate)} width={720} />
  //     <TimeSelectButtons type={timeSelect} onClick={changeTimeSelect} />
  //     <TimeSelect
  //       startTime={startTime}
  //       endTime={endTime}
  //       type={timeSelect}
  //       setStart={selectStartTime}
  //       setEnd={selectEndTime}
  //     />
  //     <ButtonContainer>
  //       <Button type="white" text="戻る" onClick={() => selectDate('')} />
  //       <Button type="blue" text="予約する" onClick={postReservation} />
  //     </ButtonContainer>
  //   </Container>
  // ) : (
  //   <Container>
  //     <Heading>学生と話したい日にちを選んでください</Heading>
  //     <HorizontalLabel
  //       text={selectedDate ? formatDate(selectedDate) : `${selectedYear}年`}
  //       width={720}
  //     />
  //     <MonthButtons
  //       authToken={auth_token}
  //       startMonth={getCurrentMonth()}
  //       selectedMonth={selectedMonth}
  //       selectedYear={selectedYear}
  //       getCalendar={getCalendar}
  //       changeYear={changeYear}
  //       changeMonth={changeMonth}
  //     />
  //     <Calendar
  //       calendar={calendar}
  //       year={selectedYear}
  //       month={selectedMonth}
  //       selectDate={selectDate}
  //     />
  //     <Button
  //       type="white"
  //       text="戻る"
  //       link={resolvePath.page('teachers', 'mypage')}
  //     />
  //   </Container>
  // )
})

const formatDate = (date: string) => {
  return `${date.replace(/-/, '年').replace(/-/, '月')}日`
}

const advance25min = (time: string) => {
  const extractedHour = time.match(/^\d+/)
  const extractedMinute = time.match(/\d+$/)
  if (!extractedHour || !extractedMinute) {
    return
  }

  const hour = extractedHour[0]
  const minute = extractedMinute[0]

  return `${hour}:${Number(minute) + 25}`
}

const Container = styled.div`
  width: 100%;
`

const Heading = styled.h2`
  margin: 0 0 48px;
  padding: 0;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`

// #Disabled as this is Request function.
// const Description = styled.p`
//   width: 568px;
//   margin: 0 auto 60px;
//   padding: 0;
//   font-size: 36px;
//   font-weight: 500;
//   letter-spacing: 0px;
//   line-height: 1.5;
//   text-align: left;
//   color: #405766;
// `

// #Disabled as this is Request function.
// const SelectButtonContainer = styled.div`
//   display: flex;
//   flex-flow: column;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 80px;
// `

// #Disabled as this is Request function.
// const SelectButtonOuter = styled.div`
//   height: 80px;
//   margin-bottom: 20px;
// `

// #Disabled as this is Request function.
// const Selectbox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 370px;
//   padding: 18px 0;
// `

// #Disabled as this is Request function.
// const SelectboxImage = styled.img`
//   width: 44px;
//   height: 44px;
//   margin-right: 16px;
// `

// #Disabled as this is Request function.
// const SelectboxText = styled.div`
//   font-size: 36px;
//   color: #405766;
// `

// #Disabled as this is Request function.
// const Help = styled.div`
//   margin-bottom: 158px;
//   text-align: center;
//   font-size: 32px;
//   text-decoration: underline;
//   color: #405766;
//   cursor: pointer;
// `

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 640px;
  margin: 0 auto;
`
