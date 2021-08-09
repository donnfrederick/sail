import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/students/Button'
import * as StudentsModels from 'models/students'
import resolvePath from 'utils/resolvePath'
import { getHobbieIds, getPurposeIds } from 'utils/manipulate'
import getAuthToken from 'utils/getAuthToken'
import { store } from 'components/organisms/Router'
import { push } from 'react-router-redux'
import ConfirmTerms from 'components/molecules/ConfirmTerms'
import { localStorage as localStorageConstant } from 'constants/index'
import TutorialModal from 'components/organisms/tutorial_modal'
import contents from 'terms/students_terms.json'

interface Props {
  close(): void
  info: StudentsModels.Info
  postMe(student: StudentsModels.Student): void
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const { close, info, postMe, setModalContents, openModal } = props

  const [checked, setChecked] = useState<boolean>(false)

  const checkboxClick = () => setChecked(!checked)

  const getStudent = () => {
    return {
      conversation_level: info.conversation_level,
      country: info.country,
      custom_gender: info.custom_gender,
      email: info.email,
      hobbies: getHobbieIds(info.hobbies),
      level: info.level,
      name: info.name,
      name_ja: info.name_ja,
      password: info.password,
      phone_number: info.phone_number,
      picture: info.picture,
      preferred_name: info.preferred_name,
      purposes: getPurposeIds(info.purposes),
      sex: info.gender,
      timezone: info.timezone
    }
  }

  const handleClick = async () => {
    localStorage.setItem('showTutorial', 'start')
    const request: StudentsModels.Student = getStudent()
    await postMe(request)

    const BILLING_FLAG = localStorage.getItem(localStorageConstant.BILLING_FLAG)
    localStorage.setItem(localStorageConstant.BILLING_FLAG, 'false')

    if (BILLING_FLAG === 'billing') {
      location.href = '/billing/students/points/overview/' + getAuthToken()
    } else {
      store.dispatch(push(resolvePath.page('students', 'mypage')))
      setModalContents(<TutorialModal />)
      openModal()
    }
  }

  return (
    <Container>
      <Header>Terms of Service</Header>
      <TextContainer>
        <ConfirmTerms contents={contents} />
      </TextContainer>
      <ConfirmationText>
        <Checkbox
          onClick={checkboxClick}
          data-active={checked}
          src={resolvePath.image('common/evaluation/check@2x.png')}
        />
        <Small>I agree with Sail's Terms of Service.</Small>
      </ConfirmationText>
      <ButtonContainer>
        <Button
          type="white"
          width={200}
          height={80}
          fontSize={27}
          text="Cancel"
          onClick={() => close()}
        />
        <Button
          type="blue"
          width={200}
          height={80}
          fontSize={27}
          text="Agree"
          isActive={checked}
          onClick={handleClick}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TextContainer = styled.div`
  width: 668px;
  max-height: 500px;
  overflow-y: scroll;
  border: 1px solid #ccc;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`
const ConfirmationText = styled.div`
  font-size: 30px;
  line-height: 1.5;
  margin-top: 30px;
  margin-bottom: 30px;
`
const Small = styled.small`
  display: block;
  width: 554px;
  margin: 0 auto;
  font-size: 28px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0px;
  color: #405766;
`
const Header = styled.text`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: #405766;
`
const Checkbox = styled<{ isActive: boolean }, any>('img')`
  float: left;
  width: 35px;
  height: 35px;
  margin-right: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: solid 3px rgb(158, 192, 204);
  background-color: white;
  &[data-active='true'] {
    border-color: transparent;
    background-color: rgb(19, 142, 254);
  }
`
