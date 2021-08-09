import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/teachers/Button'
import CompleteSignupModal from 'components/organisms/teachers/modal_contents/complete_signup'
import * as TeachersModels from 'models/teachers'
import ConfirmTerms from 'components/molecules/ConfirmTerms'
import { convertInfoToTeacher } from 'utils/convertDataStructure'
import resolvePath from 'utils/resolvePath'
import FailSignupModal from 'components/organisms/teachers/modal_contents/fail_signup'
import contents from 'terms/teachers_terms.json'

interface Props {
  close(): void
  info: TeachersModels.Info
  postMe(teacher: TeachersModels.Teacher): void
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const { close, info, postMe, setModalContents, openModal } = props

  const [checked, setChecked] = useState<boolean>(false)

  const checkboxClick = () => setChecked(!checked)

  const handleClick = async () => {
    try {
      const request = convertInfoToTeacher(info)
      await postMe(request)
      setModalContents(<CompleteSignupModal />)
    } catch (error) {
      setModalContents(<FailSignupModal />)
    }
    openModal()
  }

  return (
    <Container>
      <Header>利用規約</Header>
      <TextContainer>
        <ConfirmTerms contents={contents} />
      </TextContainer>
      <ConfirmationText>
        <Checkbox
          onClick={checkboxClick}
          data-active={checked}
          src={resolvePath.image('common/evaluation/check@2x.png')}
        />
        <Small>すべての利用規約に同意しますか？</Small>
      </ConfirmationText>
      <ButtonContainer>
        <Button
          type="white"
          width={200}
          height={80}
          fontSize={27}
          text="キャンセル"
          onClick={close}
        />
        <Button
          type="blue"
          width={200}
          height={80}
          fontSize={27}
          text="同意する"
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
  text-align: left;
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
